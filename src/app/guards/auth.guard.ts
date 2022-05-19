import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('authguard');
      console.log(state.url);
      console.log(route);
      if (!this.checkLoggedIn(state.url) ) {
        console.log('not logged');
        
        return false
      }
      if (state.url !== '/students/profile') {
        console.log('check if registered');

        this.registrationCompleted(state.url).subscribe(rc => {console.log({rc});
        })
        return this.checkStudentRole() && this.registrationCompleted(state.url)
      }
      return this.checkStudentRole()
     
      
      // return true

  }
  checkLoggedIn(url: string) {
    if (this.authService.isLoggedIn()) return true

    this.authService.redirectUrl = url
    this.router.navigate(['auth'])
    return false

  }
  checkStudentRole() {
    return this.authService.user$.pipe(
      take(1),
      map(user => user?.roles!.student && !user?.roles!.admin ? true : false),
      tap(isStudent => !isStudent? this.router.navigate(['dashboard']):true)
    )
  }
  registrationCompleted(url :string){
    return this.authService.getStudentProfile().pipe(
      take(1),
      map(profile => {
        console.log(profile);
        console.log(!!profile);
        return !!profile
      }),
      tap(rc => !rc? this.router.navigate(['/students','profile']): false)
    )
    
  }

}
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('alreadylogged in???', this.authservice.isLoggedIn());
      
    // return this.authservice.isLoggedIn()? this.router.navigate([this.authservice.redirectUrl]): true;
    return this.alreadyLoggedIn(state) && state.url == '/auth/login'
    // return true
  }
  
  alreadyLoggedIn(state: RouterStateSnapshot){
    return this.authservice.user$.pipe(take(1),
    
    map(r => r?.uid? true: false),
    tap(r =>{
      console.log('islogged?', r == true);
      if(!r && state.url == '/auth/login')
      console.log('nologeado',this.authservice.redirectUrl, state);
      if(r && state.url == '/auth/login')
      this.router.navigate(['/students'])
      
    })
    )
  }
}

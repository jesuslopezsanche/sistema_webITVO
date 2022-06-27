import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExitMonitorGuard implements CanDeactivate<unknown> {
  constructor(private authService :AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.adminConfirmed = false
      return true
    }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.adminConfirmed||this.askUserAndPassword();
  }
  askUserAndPassword(){
    let email = prompt('Ingrese su email de administrador')!
    let password = prompt('contraseña')!
    console.log({email, password});
    return this.authService.loginEmail({email,password}).then(r => {
      console.log({r});
      if (r.error) {
        return false
      }
      this.authService.adminConfirmed = true
      return true
      
    })
  }
  
}

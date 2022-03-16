import { Router } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, authState, updateProfile } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import { doc, docData, Firestore} from '@angular/fire/firestore';
export interface User {
  uid: string
  email: string
  displayName: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: Boolean
  redirectUrl: string = ''
  user$: Observable<User | null>
  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {
    this.userLoggedIn = false
    this.user$ = of(null)
    authState(this.auth).subscribe((u) => 
    {
      
      if (u) {
        
        this.user$ = of({
          displayName: u?.displayName,
          email: u.email,
          uid: u.uid
          
        }) as Observable<User>
        this.router.navigateByUrl(this.redirectUrl)
        console.log({u});
              let docu :any 
              docData(doc(this.firestore, `users/${u.uid}`)).subscribe(e =>{
                console.log(e);
                docu = e
                
              })
              console.log({docu});
        return
        
      }
      this.user$ = of(null)

    }
      )
    console.log(this.user$);
    
    this.auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        this.userLoggedIn = true
        this.user$ = of({ uid: loggedUser.uid, email: loggedUser.email!, displayName: loggedUser.displayName! })
        this.userLoggedIn = true
        this.router.navigateByUrl(this.redirectUrl)
        
      } else {
        this.userLoggedIn = false
        this.user$ = of(null)
      }
    })
  }

  signUp(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(r => {
        let emailLower = user.email.toLowerCase();
        updateProfile(r.user,{displayName: user.displayName})
        console.log(r.user.emailVerified)
      }).catch(e=> e as string)
  }

  async loginEmail(user: any): Promise<any> {

    try {
      
      
      console.log(user);
      let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
      console.log(login.user);
      this.userLoggedIn = true
      this.router.navigate(['students'])
    } catch (error) {
      console.log('error',error);
      return error
      
  }


  }
  
  logout() {
    this.auth.signOut()
    this.userLoggedIn = false
    this.router.navigate(['auth'])
  }

  isLoggedIn() {
    return !!this.auth.currentUser
  }
}

import { Router } from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, authState, updateProfile, sendPasswordResetEmail, onAuthStateChanged } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import { doc, docData, Firestore, setDoc, getDoc } from '@angular/fire/firestore';
export interface Roles {
  student?: Boolean
  admin?: Boolean
}
export interface User {
  uid: string
  email: string
  displayName?: string
  roles?: Roles
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
    this.user$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          return docData(doc(firestore, `users/${user?.uid}`)) as Observable<User>

        }
        localStorage.removeItem('user')
        return of(null)

      }
      )
    )
    this.user$.subscribe(user => {
      console.log({ user });
      if (user)
        this.redirect(user)
      this.router.navigate([this.redirectUrl])

    }
    )
  }
  redirect(user: User | null): void {
    if (user?.roles?.admin) {
      this.redirectUrl = 'dashboard'
      return
    }
    this.redirectUrl = 'students'
  }

  signUp(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(r => {
        let emailLower = user.email.toLowerCase();

        return this.updateUserData({
          uid: r.user.uid,
          email: r.user.email!
        })

      }).catch(e => e as string)
  }

  async loginEmail(user: any): Promise<any> {

    try {


      let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
      this.userLoggedIn = true
      this.router.navigate(['students'])
    } catch (error) {
      console.log('error', error);
      return error

    }

  }
  async resetPassword(email: string) {
    let response = await sendPasswordResetEmail(this.auth, email)
    console.log(response)
    this.router.navigate(['auth'])

  }

  logout() {
    this.auth.signOut()
    this.userLoggedIn = false
    this.router.navigate(['auth'])
  }

  isLoggedIn() {
    console.log(!!this.auth.currentUser);

    return !!this.auth.currentUser
  }

  updateUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: { student: true }
    }
    return setDoc(userRef, data, { merge: true })
  }
}

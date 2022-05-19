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
  name?: string
  area?: string
  email: string
  displayName?: string
  roles?: Roles
  profile?: string
}
export interface Profile {
  uid: string
  name: string
  controlNumber: string
  career: string
  semester: number
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
      console.log({ user }, router);

      if (user) {

        this.redirect(user)
        let curr = this.router.url
        if (curr != '/monitor')
        this.router.navigate([this.redirectUrl])
      }

    }
    )
  }
  redirect(user: User | null): void {
    console.log(user?.roles?.admin);

    if (user?.roles?.admin) {
      this.redirectUrl = this.redirectUrl ? this.redirectUrl : 'dashboard'
      return
    }
    this.redirectUrl = this.redirectUrl ? this.redirectUrl :'students'
  }

  signUp(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(r => {
        let emailLower = user.email.toLowerCase();

        let newUser = {
          uid: r.user.uid,
          email: r.user.email!,
          name: user.name ? user.name : null,
          area: user.area ? user.area : null,
        }
        console.log({newUser});
        

        return this.updateUserData(newUser)

      }).catch(e => e as string)
  }

  async loginEmail(user: any): Promise<any> {

    try {


      let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
      this.userLoggedIn = true
      console.log({ login });

      // this.router.navigate(['students'])
    } catch (error) {
      console.log('error', error);
      return {error}

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
    return !!this.auth.currentUser
  }

  async updateUserData(user: User) {
    console.log('creating user data', user);
    
    const userRef = await doc(this.firestore, `users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: { student: true }
    }
    if (!!user.name && !!user.area) {
      const adminData: User = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        roles: { student: true, admin: true }
      }

      return setDoc(userRef, adminData, { merge: true })

    }
    return setDoc(userRef, data, { merge: true })
  }
  updateStudentProfile(profile : Profile){
    let profileRef = doc(this.firestore, `profile/${profile.uid}`)
    
    setDoc(profileRef, profile, {merge: true})
    
  }
  getStudentProfile(){
    return <Observable<Profile>>this.user$.pipe(switchMap(u => {
      return docData(doc(this.firestore, `profile/${u!.uid}`))
    }))

  }
}

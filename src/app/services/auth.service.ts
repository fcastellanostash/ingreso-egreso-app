import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore) {}


  authStateListener(){
    return this.auth.authState;
  }

  crearUsuario(nombre : string, correo : string, password : string){
    
      return this.auth.createUserWithEmailAndPassword(correo,password)
        .then( ({user})  =>{

              const newUser = new User(user!.uid, nombre, user!.email!)
              return this.afs.doc(`${user!.uid}/usuario`).set({...newUser});
            }
        )



  }

  logearUsuario(correo : string, password : string){
    
    return this.auth.signInWithEmailAndPassword(correo,password);

}

logOut(){
    
  return this.auth.signOut();

}

isAuth(){

  return this.auth.authState.pipe(
    map( user => user != null)
  )
}


}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, sortedChanges } from '@angular/fire/compat/firestore';

import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  suscripcion! : Subscription;

  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore,
              private store : Store) {}


  authStateListener(){
    this.auth.authState.subscribe(
      fuser => {
        console.log("Usuario: ",fuser);
        if (fuser) {
          this.suscripcion = this.afs.doc(`${fuser?.uid}/usuario`).valueChanges().subscribe(
          (fireuser =>  {
            console.log("fireuser",fireuser);
            const user = User.isFirebaseUser(fireuser);
            this.store.dispatch(setUser({user}));
          
        }))
        }else{

          this.suscripcion.unsubscribe();
          this.store.dispatch(unSetUser());

        }
       }
    );


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

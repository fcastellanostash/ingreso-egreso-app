import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, sortedChanges } from '@angular/fire/compat/firestore';

import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';
import { unSetIngresoEgreso } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  suscripcion! : Subscription;
  private _usuario! : User | null;

  public get usuario() {
    return this._usuario
  }
  

  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore,
              private store : Store) {}


  authStateListener(){
    this.auth.authState.subscribe(
      fuser => {
        if (fuser) {
          this.suscripcion = this.afs.doc(`${fuser?.uid}/usuario`).valueChanges().subscribe(
          (fireuser =>  {
            const user = User.isFirebaseUser(fireuser);
            this._usuario = user;
            this.store.dispatch(setUser({user}));
          
        }))
        }else{
          this._usuario = null;
          this.suscripcion.unsubscribe();
          this.store.dispatch(unSetUser());
          this.store.dispatch(unSetIngresoEgreso());

        }
       }
    );


  }

  crearUsuario(nombre : string, correo : string, password : string){
    
      return this.auth.createUserWithEmailAndPassword(correo,password)
        .then( ({user})  =>{

              const newUser = new User(user!.uid, user!.email!, nombre)
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

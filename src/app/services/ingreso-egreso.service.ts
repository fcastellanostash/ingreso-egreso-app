import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, sortedChanges } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore : AngularFirestore,
              private authservice : AuthService) { }

  crearIngresoEgrso(ingresoEgreso : IngresoEgreso){
    const uid = this.authservice.usuario?.uid;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso})

  }

  eliminarIngresoEgrso(itemId? : string){
    const uid = this.authservice.usuario?.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${itemId}`)
    .delete()
  
  }

  initIngresoEgresoListener(uid : string){

    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
          return snapshot.map( doc => {
            const uid = doc.payload.doc.id;
            const item : any = doc.payload.doc.data();  

            return {
              uid,
              ...item
            }
          }
        )
      })
    )

  }



}

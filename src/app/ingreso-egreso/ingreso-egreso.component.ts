import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';
import * as uiactions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm : FormGroup =  this.fb.group({
    descripcion: ['', Validators.required],
    monto: ['', Validators.required]
  });
  tipo : string = "ingreso"; 
  cargando : boolean = false;
  suscripcion! : Subscription;
  
  constructor(private fb : FormBuilder,
              private is : IngresoEgresoService,
              private store : Store<AppState>) { }

  ngOnInit(): void {

    this.suscripcion =  this.store.select('ui').subscribe( ui =>  {
      this.cargando = ui.isLoading;

  })
  }

  ngOnDestroy(): void {

    this.suscripcion.unsubscribe()
  
  }

  guardar(){
    if (this.ingresoForm.invalid) return;

    this.store.dispatch(uiactions.isLoading())
    
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);

    this.is.crearIngresoEgrso(ingresoEgreso)
    .then(resp => {
      console.log("respuesta crear ingreso",resp)
      this.store.dispatch(uiactions.stopLoading())
      this.ingresoForm.reset();
      Swal.fire('Registro Creado', descripcion, 'success')
    })
    .catch(err => {
      this.store.dispatch(uiactions.stopLoading())
      Swal.fire('Error', err.messagge, 'error')
    });

  }

}

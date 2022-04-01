import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import * as uiactions from '../../shared/ui.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingresosEgresos : IngresoEgreso[] = [];
  public suscripcion! : Subscription;
  public cargando : boolean = false;

  constructor(private store : Store<AppState>,
              private is : IngresoEgresoService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.suscripcion = this.store.select(state => ({  ui: state.ui, ingresoEgreso: state.ingresoEgreso }))
      .subscribe(
      ({ui,ingresoEgreso}) => {
        this.cargando = ui.isLoading;
        this.ingresosEgresos = ingresoEgreso.items
      }
    )
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  borrar(uid? : string){
    this.store.dispatch(uiactions.isLoading())
    this.is.eliminarIngresoEgrso(uid)
      .then(resp => 
        {
          this.store.dispatch(uiactions.stopLoading())
          Swal.fire('Registro Eliminado', 'El registro ha sido eliminado con exito', 'success')

        })
      .catch(err => {
        this.store.dispatch(uiactions.stopLoading())
        Swal.fire('Error', err.messagge, 'error')

      })
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setIngresoEgreso } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public authSuscripcion! : Subscription;
  public itemsSuscripcion! : Subscription;

  constructor(private store : Store<AppState>,
              private ingresoEgresoService : IngresoEgresoService) { }
  

  ngOnInit(): void {

    this.authSuscripcion = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( ({user}) => {
      this.itemsSuscripcion = this.ingresoEgresoService.initIngresoEgresoListener(user!.uid)
        .subscribe(ingresosEgresosFB => {
          this.store.dispatch(setIngresoEgreso({items: ingresosEgresosFB }))
         })
    })

  }

  ngOnDestroy(){
    this.authSuscripcion.unsubscribe();
    this.itemsSuscripcion.unsubscribe();

    }

}

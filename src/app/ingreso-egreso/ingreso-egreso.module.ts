import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresoEgresoOrderPipe } from '../pipes/ingreso-egreso-order.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    IngresoEgresoOrderPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)

  ]
})
export class IngresoEgresoModule { }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public totalIngresos : number = 0 ;
  public totalEgresos  : number =0 ;
  
  public ingresos  : number = 0;
  public egresos   : number = 0;

  public suscripcion! : Subscription;
  public cargando : boolean = true;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };
  
  constructor(private store : Store<AppState>,
              private is : IngresoEgresoService) { }

  ngOnInit(): void {
    this.suscripcion = this.store.select(state => ({  ui: state.ui, ingresoEgreso: state.ingresoEgreso }))
    .subscribe(
    ({ui,ingresoEgreso}) => {
      this.totalIngresos = 0 ;
      this.totalEgresos  =0 ;
      this.ingresos = 0;
      this.egresos = 0;

      for (const item of ingresoEgreso.items) {
        if(item.tipo === 'ingreso'){
          this.totalIngresos += item.monto;
          this.ingresos++;
        }else{
          this.totalEgresos += item.monto;
          this.egresos++;
        }

      }
      this.doughnutChartData.datasets =[{data: [this.totalIngresos,this.totalEgresos]}];
    }
  )

  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgresoOrder'
})
export class IngresoEgresoOrderPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a,b) => {
      console.log(a);

        if(a.tipo === "ingreso"){
          return -1

        }else{

          return 1;
        }
    

    });
  
  }

}

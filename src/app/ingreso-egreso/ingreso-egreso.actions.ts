import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetIngresoEgreso = createAction('Unset Ingreso-Egreso');
export const setIngresoEgreso = createAction(
                                'Set Ingreso-Egreso',
                                props<{items : IngresoEgreso[]}>());

import { createReducer, on } from '@ngrx/store';
import * as authActios from './auth.actions';
import { User } from '../models/user.model';

export interface State {
    user : User | null
};

export const initialState: State = {
    user : null
        
};

export const reducer = createReducer(
    initialState,
    on(authActios.setUser,(state, {user} ) => ({...state, user : {...user}})),
    on(authActios.unSetUser,(state) => ({...state, user : null })),
);
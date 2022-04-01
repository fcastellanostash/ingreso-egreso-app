import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  miFormulario : FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]

  })


  cargando : boolean = false;
  suscripcion! : Subscription;

  constructor(private fb : FormBuilder,
              private authservice : AuthService,
              private router : Router,
              private store : Store<AppState>) { }
  
  
  
  
  ngOnInit(): void {

   this.suscripcion =  this.store.select('ui').subscribe( ui =>  {
      
        console.log('suscribe ui');
        this.cargando = ui.isLoading;

    })


  }

  ngOnDestroy(): void {

    this.suscripcion.unsubscribe()
  
  }

  logIn(){

    if (this.miFormulario.invalid) return;
    const {nombre, correo, password} = this.miFormulario.value;


    

    this.store.dispatch(isLoading())
    // Swal.fire({
    //   title: 'Espere por favor',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   }
    // })


    this.authservice.logearUsuario(correo,password)
      .then( usuario => {
        console.log("usuario",usuario)
        this.store.dispatch(stopLoading())

        // Swal.close();
        this.router.navigate(['/']);

      })
      .catch( err => {
        console.log("err",err)

        this.store.dispatch(stopLoading())

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })


      })

  }

}

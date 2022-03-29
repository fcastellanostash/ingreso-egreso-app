import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {


  miFormulario : FormGroup = this.fb.group({
    nombre : ['', Validators.required],
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

  enviar(){

    if (this.miFormulario.invalid) return;

    this.store.dispatch(isLoading())

    // Swal.fire({
    //   title: 'Espere por favor',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   }
    // })
    const {nombre, correo, password} = this.miFormulario.value;
    
    this.authservice.crearUsuario(nombre, correo, password)
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch(stopLoading())

        this.router.navigate(['/']);
      
      })
      .catch(err => {
        this.store.dispatch(stopLoading())

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })
      })

  }

}

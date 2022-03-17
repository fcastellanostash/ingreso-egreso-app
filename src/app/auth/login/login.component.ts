import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario : FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]

  })


  constructor(private fb : FormBuilder,
              private authservice : AuthService,
              private router : Router) { }



  logIn(){

    if (this.miFormulario.invalid) return;
    const {nombre, correo, password} = this.miFormulario.value;


    Swal.fire({
      title: 'Espere por favor',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading() 
      }
    })


    this.authservice.logearUsuario(correo,password)
      .then( usuario => {
        console.log(usuario)
        Swal.close();
        this.router.navigate(['/']);

      })
      .catch( err => {

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })


      })

  }

}

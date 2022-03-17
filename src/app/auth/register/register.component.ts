import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {


  miFormulario : FormGroup = this.fb.group({
    nombre : ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]

  })


  constructor(private fb : FormBuilder,
              private authservice : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }

  enviar(){

    if (this.miFormulario.invalid) return;

    
    Swal.fire({
      title: 'Espere por favor',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading() 
      }
    })
    const {nombre, correo, password} = this.miFormulario.value;
    
    this.authservice.crearUsuario(nombre, correo, password)
      .then( credenciales => {
        Swal.close();

        this.router.navigate(['/']);
      
      })
      .catch(err => {

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })
      })

  }

}

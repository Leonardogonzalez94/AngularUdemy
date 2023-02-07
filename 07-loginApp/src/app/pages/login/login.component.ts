import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
//import * as _swal from 'sweetalert';
//import { SweetAlert } from 'sweetalert/typings/core';
//const swal: SweetAlert=_swal as any;
import Swal from 'sweetalert2';
//const Swal = require('sweetalert2');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme= false;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('email')){
      this.usuario.email= localStorage.getItem('email');
      this.recordarme=true;
    }
  }

  login(form: NgForm) {
    // console.log('Imprimir SI el formulario es válido');
    if (form.invalid) { return; }
    //  console.log(this.usuario)
    //  console.log(form);
    // swal({
    //  // allowOutsideClick: false,
    //   closeOnClickOutside:false,
      
    //   icon: 'info',
    //   text: 'Espere por favor...',
    //   timer:4000
    // });
    //swal.stopLoading;

    Swal.fire({
      allowOutsideClick:false,
      type: 'info',
      text: 'Espere por favor',
      timer:5000
     
   });
   Swal.showLoading();


    this.auth.login(this.usuario)
      .subscribe(resp => {
        console.log(resp)
       Swal.close();

       if (this.recordarme){

        localStorage.setItem('email', this.usuario.email);  ///guarda en el local Storage el correo
       }

       this.router.navigateByUrl('/home')
       



      }, (err) => {
        console.log(err.error.error.message);
        // swal({
        //   icon: 'error',
        //   title: 'Error al autenticar',
        //   text: err.error.error.message
        // });

        Swal.fire({
     
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
          timer:5000
         
       });
      });
  }

}

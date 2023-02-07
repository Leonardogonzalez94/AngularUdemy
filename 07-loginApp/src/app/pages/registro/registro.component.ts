import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

//const Swal = require('sweetalert2');


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:UsuarioModel
  recordarme=false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario=new UsuarioModel();
   // this.usuario.email= 'dlgc12@hotmail.com';
  }

  onSubmit(form: NgForm){

    if( form.invalid) { return;}   //si el formulario no es valido retorne

    Swal.fire({
       allowOutsideClick:false,
       type: 'info',
       text: 'Espere por favor',
       timer:5000
      
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
    .subscribe(resp => {
      console.log(resp);
      Swal.close();

      if (this.recordarme){

        localStorage.setItem('email', this.usuario.email);  ///guarda en el local Storage el correo
       }
 
      this.router.navigateByUrl('/home')

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
     
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message,
        timer:5000
       
     });

    });
   // console.log('Formulario enviado');
   // console.log(this.usuario)
   // console.log(form)
  }


}

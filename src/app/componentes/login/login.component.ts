import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  elemento:any = {};
  formulario = null;
  //Define si esta autenticado
  estaAutenticado:boolean = false;
  //Define el listado de empresas
  empresas = null;
  //Constructor
  constructor(private loginService: LoginService, private usuarioService: UsuarioService,
    private appComponent: AppComponent, private router: Router) {
      this.formulario = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
      });
  }
  
  //Loguea un usuario
  public login() {
    console.log(this.elemento.username+"---"+ this.elemento.password);
    this.loginService.login(this.elemento.username, this.elemento.password)
    .subscribe(res => {
      if(res.headers.get('authorization')) {
        //Obtiene el menu
        this.appComponent.obtenerMenu();
        //Almacena el token en el local storage
        localStorage.setItem('token', res.headers.get('authorization'));
        //Establece logueado en true
        this.loginService.setLogueado(true);
        this.estaAutenticado = true;
        //Obtiene el usuario por username
        this.usuarioService.obtenerPorUsername(this.elemento.username).subscribe(
          res => {
            this.appComponent.setUsuario(res.json());
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.loginService.setLogueado(false);
      }
    });
}
  //Define un metodo para ingreso una vez logueado el usuario y seleccionado una empresa
  public ingresar() {
    if(this.estaAutenticado === true) {
      //Navega a la pagina principal (home)
      this.router.navigate(['/home']);
    }
  }
}

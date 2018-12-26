import { Component } from '@angular/core';
import { ModuloService } from './servicios/modulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public visible:boolean = false;
  public usuario: any;
  public menu: Array<any>;
  public subopcion: any;
  constructor(private moduloServicio: ModuloService, private router: Router) {
    //this.obtenerMenu();
    
  }
  public setVisible(valor) {
    this.visible = valor;
  }
  //obtener el usuario logueado
  public getUsuario(){
    return this.usuario;
  }
  //cargar el usuario 
  public setUsuario(usuario){
    this.usuario = usuario;
    console.log(this.usuario);
  }
  //Obtiene la subopcion
  public getSubopcion() {
    return this.subopcion;
  }
  //Establece la subopcion
  public setSubopcion(subopcion) {
    this.subopcion = subopcion;
  }
  //Obtiene la lista de modulos para armar el menu
  public obtenerMenu() {
    this.moduloServicio.obtenerMenuPorRol(1).subscribe(
      res => {
        this.menu = res.json();
      },
      err => {
        console.log(err);
      }
    );  
  }
  //Define la navegación en el menu
  public navegar(modulo, subopcion) {
    this.setSubopcion(subopcion.id);
    var pag = modulo.modulo + subopcion.subopcion;
    var pagina = pag.toLowerCase();
    console.log(pagina);
    pagina = pagina.replace(new RegExp(/\s/g), "");
    pagina = pagina.replace(new RegExp(/[àá]/g), "a");
    pagina = pagina.replace(new RegExp(/[èé]/g), "e");
    pagina = pagina.replace(new RegExp(/[ìí]/g), "i");
    pagina = pagina.replace(new RegExp(/ñ/g), "n");
    pagina = pagina.replace(new RegExp(/[òó]/g), "o");
    pagina = pagina.replace(new RegExp(/[ùú]/g), "u");
    pagina = pagina.replace(new RegExp(/ /g), "");
    pagina = pagina.replace(new RegExp(/[-]/g), "");
    pagina = pagina.replace(new RegExp(/[,]/g), "");
    pagina = pagina.replace(new RegExp(/[.]/g), "");
    pagina = pagina.replace(new RegExp(/[/]/g), "");
    this.router.navigate([pagina]);
  }
}
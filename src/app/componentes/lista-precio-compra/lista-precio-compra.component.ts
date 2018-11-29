import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { Pestania } from 'src/app/modelos/pestania';
import { RolService } from 'src/app/servicios/rol.service';
import { Rol } from 'src/app/modelos/rol';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Autorizado } from 'src/app/modelos/autorizado';
import { AutorizadoService } from 'src/app/servicios/autorizado.service';
import { ListaPrecioCompraService } from 'src/app/servicios/lista-precio-compra.service';
import { ListaPrecioCompra } from 'src/app/modelos/listaPrecioCompra';

@Component({
  selector: 'app-lista-precio-compra',
  templateUrl: './lista-precio-compra.component.html',
  styleUrls: ['./lista-precio-compra.component.scss']
})
export class ListaPrecioCompraComponent implements OnInit {
  // define el formulario
  public formulario: FormGroup;
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  //Define la lista para roles
  public listaRoles:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = false;
  //Define si mostrar el boton
  public mostrarBoton:boolean = null;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService, private listaPrecioCompraService: ListaPrecioCompraService, private listaPrecioCompra: ListaPrecioCompra) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.listaPrecioCompraService.listarPorListaPrecio(data).subscribe(res => {
          this.resultados = res.json();
        })
      }
    })
   }

  ngOnInit() {
  }

}

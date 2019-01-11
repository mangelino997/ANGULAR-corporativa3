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

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.scss']
})
export class AutorizadoComponent implements OnInit {
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
  constructor(private autorizadoService: AutorizadoService,private autorizado: Autorizado, private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService) { 
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.autorizadoService.listarPorAlias(data).subscribe(res => {
          this.resultados = res.json();
        })
      }
    })
  }

  ngOnInit() {
    //inicializa el formulario y sus elementos
    this.formulario= this.autorizado.formulario;
    //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
    this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
      res => {
        this.pestanias= res.json();
        console.log(this.pestanias);
        this.pestanias.splice(0, 1); //Elimino la pestaña "Agregar"
        this.activeLink= this.pestanias[0].pestania.nombre;
      }
    );
    //Establece los valores, activando la primera pestania 
    this.seleccionarPestania(2, 'Buscar', 0);
    //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
    this.listar();
  }

  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado(elemento) {
    this.formulario.patchValue(elemento);
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.nombre ? elemento.nombre : elemento;
    } else {
      return elemento;
    }
  }
  //Funcion para establecer los valores de las pestañas
  private establecerValoresPestania(nombrePestania, autocompletado, soloLectura, boton, componente) {
    this.pestaniaActual = nombrePestania;
    this.mostrarAutocompletado = autocompletado;
    this.soloLectura = soloLectura;
    this.mostrarBoton = boton;
    setTimeout(function () {
      document.getElementById(componente).focus();
    }, 20);
    this.autocompletado.reset();
  };
  //Establece valores al seleccionar una pestania
  public seleccionarPestania(id, nombre, opcion) {
    this.formulario.reset();
    this.indiceSeleccionado = id;
    this.activeLink = nombre;
    this.listar();
    /*
    * Se vacia el formulario solo cuando se cambia de pestania, no cuando
    * cuando se hace click en ver o mod de la pestania lista
    */
   if(opcion == 0) {
    this.autocompletado.setValue(undefined);
    this.resultados = [];
  }
  switch (id) {
    // case 1:
    //   this.obtenerSiguienteId();
    //   this.establecerValoresPestania(nombre, false, false, true, 'idNombre');
    //   break;
    case 2:
      this.establecerValoresPestania(nombre, true, true, false, 'idAutocompletado');
      break;
    case 3:
      this.establecerValoresPestania(nombre, true, false, true, 'idAutocompletado');
      break;
    case 4:
      this.establecerValoresPestania(nombre, true, true, true, 'idAutocompletado');
      break;
    default:
      break;
  }
}
//Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
public accion(indice) {
  console.log(this.indiceSeleccionado);
  switch (indice) {
    // case 1:
    //   this.agregar();
    //   break;
    case 3:
      this.actualizar();
      break;
    case 4:
      this.eliminar();
      break;
    default:
      break;
  }
}
//Obtiene el ID del modulo traido desde la base de datos y lo muestra en el campo id del formulario.
  private obtenerSiguienteId(){
    this.autorizadoService.obtenerSiguienteId().subscribe(
      res => {
        console.log(res);
        this.formulario.get('id').setValue(res.json());
      },
      err => {
        console.log(err);
      }
    );
  }
  // Carga en listaCompleta todos los registros de la DB
  private listar(){
    this.autorizadoService.listar().subscribe(
      res => {
        this.listaCompleta=res.json();
      },
      err => {
        console.log(err);
      }
    );
  }
  //Agrega un registro 
  private agregar(){
    this.autorizadoService.agregar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 201) {
          this.reestablecerFormulario(respuesta.id);
          setTimeout(function() {
            document.getElementById('idNombre').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("labelNombre").classList.add('label-error');
          document.getElementById("idNombre").classList.add('is-invalid');
          document.getElementById("idNombre").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }
  //Actualiza un registro
  private actualizar(){
    console.log("entra");
    this.autorizadoService.actualizar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 200) {
          this.reestablecerFormulario(undefined);
          setTimeout(function() {
            document.getElementById('idAutocompletado').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("labelNombre").classList.add('label-error');
          document.getElementById("idNombre").classList.add('is-invalid');
          document.getElementById("idNombre").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }
  //Elimina un registro
  private eliminar(){
    this.autorizadoService.eliminar(this.formulario.get('id').value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  //Reestablece los campos formularios
  private reestablecerFormulario(id) {
    this.formulario.reset();
    this.formulario.get('id').setValue(id);
    this.autocompletado.setValue(undefined);
    this.resultados = [];
  }
  //Manejo de colores de campos y labels
  public cambioCampo(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
  //Muestra en la pestania buscar el elemento seleccionado de listar
  public activarConsultar(elemento) {
    this.seleccionarPestania(2, this.pestanias[0].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
  }
  //Muestra en la pestania actualizar el elemento seleccionado de listar
  public activarActualizar(elemento) {
    this.seleccionarPestania(3, this.pestanias[1].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
  }
  //Maneja los evento al presionar una tacla (para pestanias y opciones)
  public manejarEvento(keycode) {
    var indice = this.indiceSeleccionado;
    if(keycode == 113) {
      if(indice < this.pestanias.length) {
        this.seleccionarPestania(indice+1, this.pestanias[indice].pestania.nombre, 0);
      } else {
        this.seleccionarPestania(1, this.pestanias[0].pestania.nombre, 0);
      }
    }
  }
   //Define el mostrado de datos y comparacion en campo select
   public compareFn = this.compararFn.bind(this);
   private compararFn(a, b) {
     if(a != null && b != null) {
       return a.id === b.id;
     }
   }
  //Habilita o deshabilita los campos select dependiendo de la pestania actual
  private establecerEstadoCampos(estado) {
    if(estado) {
      this.formulario.get('esABM').enable();
      this.formulario.get('modulo').enable();
    } else {
      this.formulario.get('rol').disable();
      this.formulario.get('modulo').disable();
    }
  }

}

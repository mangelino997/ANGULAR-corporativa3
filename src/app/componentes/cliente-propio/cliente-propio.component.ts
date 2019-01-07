import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { ClientePropioService } from 'src/app/servicios/cliente-propio.service';
import { ClientePropio } from 'src/app/modelos/clientePropio';
import { Autorizado } from 'src/app/modelos/autorizado';
import { AutorizadoService } from 'src/app/servicios/autorizado.service';
import { Foto } from 'src/app/modelos/foto';
import { FotoService } from 'src/app/servicios/foto.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as $ from 'jquery';
import { AppService } from 'src/app/servicios/app.service';


@Component({
  selector: 'app-cliente-propio',
  templateUrl: './cliente-propio.component.html',
  styleUrls: ['./cliente-propio.component.scss']
})
export class ClientePropioComponent implements OnInit {
// define el formulario de cliente propio
public formulario: FormGroup;
// define el formulario para Foto
public formularioFoto: FormGroup;
//Define la lista completa de registros
public listaCompleta:Array<any> = [];
//Define la lista para roles
public listaRoles:Array<any> = [];
//Define la lista para roles
public listaAutorizados:Array<any> = [];
//Define la lista para autorizados añadidos 
public listaAutorizadosAgregados:Array<any> = [];
//Define la lista para autorizados añadidos por ID
public listaAutorizadosAgregadosId:Array<any> = [];
//Define la lista para autorizados añadidos por un Cliente
public listaAutorizadosPorCliente:Array<any> = [];
// define la lista de pestañas 
public pestanias: Array<any>;
// define el link que sera activado
public activeLink: any;
// define el autocompletado como un formControl
public autocompletado: FormControl=new FormControl();
// define el autocompletado como un formControl
public autocompletadoAutorizados: FormControl=new FormControl();
//Define la pestania actual seleccionada
public pestaniaActual:string = null;
//Define la URL BASE
public urlBase:string = null;
//Define si mostrar el autocompletado
public mostrarAutocompletado:boolean = null;
//Define si el campo es de solo lectura
public soloLectura:boolean = false;
//Define si el segundo <img> en subir imagen se muestra o no
public muestraImagenPc: boolean=true;
//Define si mostrar el boton
public mostrarBoton:boolean = null;
//Define el indice seleccionado de pestania
public indiceSeleccionado:number = null;
//Define la lista de resultados de busqueda
public resultados:Array<any> = [];
//Definimos la variable donde guardaremos la foto
public archivo: File=null;
//datos imagen
public respuestaImagenEnviada;
public resultadoCarga;
//id de la foto del cliente para mostrarla en Consultar, Actualizar y Eliminar
public idFoto: number=8;
// guarda el json del campo Foto del cliente que se selecciono/actualizo
public fotoCliente: number;
// lista de Autorizados seleccionados por el usuario
public autorizadoSeleccionado:Array<any> = [];
//captura el elemento 'inputAutorizado' del dom (como un document.getElementById)
@ViewChild('inputAutorizado') inputAgregar: ElementRef;
//captura el elemento 'tablaAutorizados' del dom 
@ViewChild('tablaAutorizados') tablaAutorizados: ElementRef;
//captura el elemento 'tablaAutorizados' del dom 
@ViewChild('autorizadosPorCliente') autorizadosPorCliente: ElementRef;
//captura el elemento 'accionesAutorizados' del dom 
@ViewChild("accionesAutorizados") accionesAutorizados: ElementRef;
  bandera: boolean= false;

//declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
constructor(private appService: AppService ,private renderer: Renderer2, public dialog: MatDialog, private foto:Foto, private fotoService: FotoService ,private autorizado: Autorizado, private autorizadoService: AutorizadoService, private clientePropioService: ClientePropioService, private clientePropio: ClientePropio, private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService) { 
  this.autocompletado.valueChanges.subscribe(data => {
    if(typeof data == 'string') {
      this.clientePropioService.listarPorAlias(data).subscribe(res => {
        console.log(res.json());
        this.resultados = res.json();
      })
    }
  });

  this.autocompletadoAutorizados.valueChanges.subscribe(data => {
    if(typeof data == 'string') {
      this.autorizadoService.listarPorAlias(data).subscribe(res => {
        this.listaAutorizados = res.json();
        console.log(this.listaAutorizados);
      })
    }
  });
  
  console.log(this.muestraImagenPc);

}
//declaramos los metodos para utilizar el Modal/Dialog
openDialog(): void {
  const dialogRef = this.dialog.open(ClientePropioModal, {
    width: '750px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
ngOnInit() {
  //inicializa el formulario y sus elementos
  this.formulario= this.clientePropio.formulario;
  //inicializa el formulario y sus elementos
  this.formularioFoto= new FormGroup({foto: new FormControl()});
  //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
  this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
    res => {
      this.pestanias= res.json();
      this.activeLink= this.pestanias[0].pestania.nombre;
    }
  );
  //Establece los valores, activando la primera pestania 
  this.seleccionarPestania(1, 'Agregar', 0);
  // inicializa en true
  this.muestraImagenPc=true;
  //Cargamos la URL BASE para mostrar las imagenes
  this.urlBase=this.appService.URL_BASE;
}

public mostrar(){
  console.log(this.listaAutorizadosAgregados);
}

//Pasa el foco a cargar foto al apretar tab en "nuevo autorizado"
public focoImagen(e) { 
  setTimeout(function () {
    document.getElementById('file-input').focus();
  }, 20);
}

//Pasa el foco a la tabla de autorizados agregados
public focoBtnAgregar() { 
  console.log("tabb");
  document.getElementById("idBoton").focus();
  setTimeout(function () {
    document.getElementById("idBoton").focus();
  }, 20);
}

//Establece el formulario al seleccionar elemento del autocompletado
public cambioAutocompletado(elemento) {
  this.formulario.patchValue(elemento);
  this.borrarAgregados();
  this.listarAutorizado(elemento);
  this.mostrarFotoCliente(elemento);
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
};
//Establece valores al seleccionar una pestania
public seleccionarPestania(id, nombre, opcion) {
this.formulario.reset();
this.formularioFoto.reset();
this.muestraImagenPc=true;
this.idFoto=0;
this.indiceSeleccionado = id;
this.activeLink = nombre;
this.borrarAgregados();
this.listar();
/*
* Se vacia el formulario solo cuando se cambia de pestania, no cuando
* cuando se hace click en ver o mod de la pestania lista
*/
if(opcion == 0) {
this.autocompletado.setValue(undefined);
this.autocompletadoAutorizados.setValue(undefined);
this.resultados = [];
this.listaAutorizados = [];
}
switch (id) {
case 1:
  this.obtenerSiguienteId();
  this.establecerValoresPestania(nombre, false, false, true, 'idNombre');
  this.reestablecerFormulario(undefined);
  break;
case 2:
  this.establecerValoresPestania(nombre, true, true, false, 'idAutocompletado');
  this.mostrarFotoCliente(this.idFoto);
  this.reestablecerFormulario(undefined);
  this.muestraImagenPc=false;
  break;
case 3:
  this.establecerValoresPestania(nombre, true, false, true, 'idAutocompletado');
  this.mostrarFotoCliente(this.idFoto);
  this.reestablecerFormulario(undefined);
  this.muestraImagenPc=false;
  break;
case 4:
  this.establecerValoresPestania(nombre, true, true, true, 'idAutocompletado');
  this.mostrarFotoCliente(this.idFoto);
  this.reestablecerFormulario(undefined);
  this.muestraImagenPc=false;
  break;
case 5:
  //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
  this.listar();
  this.muestraImagenPc=false;
default:
  break;
}
}
//Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
public accion(indice) {
switch (indice) {
case 1:
  this.agregar();
  break;
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
this.clientePropioService.obtenerSiguienteId().subscribe(
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
this.clientePropioService.listar().subscribe(
  res => {
    this.listaCompleta=res.json();
  },
  err => {
    console.log(err);
  }
);
}
// añade un autorizado seleccionado a la lista
public addAutorizados(autorizado) {
    this.listaAutorizadosAgregados.push(autorizado);
    this.inputAgregar.nativeElement.value="";
    
}
// elimina un autorizado seleccionado de la lista
public  deleteAutorizados(a) {
  console.log(this.soloLectura);
    for(let i=0; i< this.listaAutorizadosAgregados.length; i++ ){
         if(a==this.listaAutorizadosAgregados[i]){
          this.listaAutorizadosAgregados.splice(i, 1);
       }
    
  }
}
//Agrega un registro 
private agregar(){
console.log(this.archivo);
this.fotoService.postFileImagen(this.archivo).subscribe(res=>{
  var respuesta = res.json();
  let foto = { 
    id: respuesta.id
  }
  this.formulario.get('foto').setValue(foto);
  //obtiene el array de autorizados agregados y los guarda en el campo 'autorizados' del formulario
  this.formulario.get('autorizados').setValue(this.listaAutorizadosAgregados);
  console.log( this.formulario.value);
  this.clientePropioService.agregar(this.formulario.value).subscribe(
    res => {
      var respuesta = res.json();
      this.muestraImagenPc=false;
      if(respuesta.codigo == 201) {
        this.reestablecerFormulario(undefined);
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
      if(respuesta.codigo == 11011) {
        document.getElementById("labelDni").classList.add('label-error');
        document.getElementById("idDni").classList.add('is-invalid');
        document.getElementById("idDni").focus();
        this.toastr.error(respuesta.mensaje);
      }
      if(respuesta.codigo == 11008) {
        document.getElementById("labelCuil").classList.add('label-error');
        document.getElementById("idCuil").classList.add('is-invalid');
        document.getElementById("idCuil").focus();
        this.toastr.error(respuesta.mensaje);
      }
      if(respuesta.codigo == 11003) {
        document.getElementById("labelCorreo").classList.add('label-error');
        document.getElementById("idCorreoElectronico").classList.add('is-invalid');
        document.getElementById("idCorreoElectronico").focus();
        this.toastr.error(respuesta.mensaje);
      }
      if(respuesta.codigo == 500) {
        document.getElementById("labelCorreo").classList.add('label-error');
        document.getElementById("idCorreoElectronico").classList.add('is-invalid');
        document.getElementById("idCorreoElectronico").focus();
        this.toastr.error(respuesta.mensaje);
      }
    }
  );
});
}
//Actualiza un registro
private actualizar(){
//obtiene el array de autorizados agregados y los guarda en el campo 'autorizados' del formulario
if(this.bandera== true){
  this.fotoService.postFileImagen(this.archivo).subscribe(res=>{
    var respuesta = res.json();
    let foto = { 
      id: respuesta.id
    }
    this.formulario.get('foto').setValue(foto);
    this.formulario.get('autorizados').setValue(this.listaAutorizadosAgregados);
    this.clientePropioService.actualizar(this.formulario.value).subscribe(
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
        if(respuesta.codigo == 11011) {
          document.getElementById("labelDni").classList.add('label-error');
          document.getElementById("idDni").classList.add('is-invalid');
          document.getElementById("idDni").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 11008) {
          document.getElementById("labelCuil").classList.add('label-error');
          document.getElementById("idCuil").classList.add('is-invalid');
          document.getElementById("idCuil").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 11003) {
          document.getElementById("labelCorreo").classList.add('label-error');
          document.getElementById("idCorreoElectronico").classList.add('is-invalid');
          document.getElementById("idCorreoElectronico").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 500) {
          document.getElementById("labelCorreo").classList.add('label-error');
          document.getElementById("idCorreoElectronico").classList.add('is-invalid');
          document.getElementById("idCorreoElectronico").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }
  );
}
else{
  this.formulario.get('foto').setValue(this.fotoCliente);
  this.formulario.get('autorizados').setValue(this.listaAutorizadosAgregados);
    this.clientePropioService.actualizar(this.formulario.value).subscribe(
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
        if(respuesta.codigo == 11011) {
          document.getElementById("labelDni").classList.add('label-error');
          document.getElementById("idDni").classList.add('is-invalid');
          document.getElementById("idDni").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 11008) {
          document.getElementById("labelCuil").classList.add('label-error');
          document.getElementById("idCuil").classList.add('is-invalid');
          document.getElementById("idCuil").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 11003) {
          document.getElementById("labelCorreo").classList.add('label-error');
          document.getElementById("idCorreoElectronico").classList.add('is-invalid');
          document.getElementById("idCorreoElectronico").focus();
          this.toastr.error(respuesta.mensaje);
        }
        if(respuesta.codigo == 500) {
          document.getElementById("labelCorreo").classList.add('label-error');
          document.getElementById("idCorreoElectronico").classList.add('is-invalid');
          document.getElementById("idCorreoElectronico").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
}

}
//Elimina un registro
private eliminar(){
this.clientePropioService.agregar(this.formulario.get('id').value).subscribe(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
}
//borro todo lo que tenga cargada la lista
public borrarAgregados(){
  this.listaAutorizadosAgregados.splice(0, this.listaAutorizadosAgregados.length);
}
//lista en la tabla todos los autorizados seleccionados por el Cliente
public listarAutorizado(elemento){
  for(let i=0;i<elemento.autorizados.length; i++){
    this.listaAutorizadosAgregados.push(elemento.autorizados[i]);
  }
}

//metodo añadir autorizado a la tabla
public añadirAutorizado(a){
  this.autorizadoSeleccionado=a;
}
//metodo añadir autorizado a la tabla
public listarAutorizadosPorCliente(a){
  this.autorizadoSeleccionado=a;
}


//Reestablece los campos formularios
private reestablecerFormulario(id) {
this.formulario.reset();
this.obtenerSiguienteId();
this.autocompletado.setValue(undefined);
this.autocompletadoAutorizados.setValue(undefined);
this.resultados = [];
this.listaAutorizados = [];
this.borrarAgregados();
this.formularioFoto.reset();
this.formularioFoto.get('foto').setValue(null);
this.formulario.get('foto').setValue(null);
this.muestraImagenPc=true;
console.log(this.idFoto);
//this.idFoto=51;
// this.listarAutorizado(id);
}
//Manejo de colores de campos y labels
public cambioCampo(id, label) {
  document.getElementById(id).classList.remove('is-invalid');
  document.getElementById(label).classList.remove('label-error');
};
//Muestra en la pestania buscar el elemento seleccionado de listar
public activarConsultar(elemento) {
  this.seleccionarPestania(2, this.pestanias[1].pestania.nombre, 1);
  this.autocompletado.setValue(elemento);
  this.formulario.patchValue(elemento);
  //borro todo lo que tenga cargada la lista
  this.borrarAgregados();
  //agrego los autorizados del Cliente seleccionado
  this.listarAutorizado(elemento);
  this.mostrarFotoCliente(elemento);
  this.muestraImagenPc=false;
}
//mostrar Foto del Cliente en pestaña Actualizar, Consulat y Eliminar
public mostrarFotoCliente(elemento){
  console.log("datos de la foto "+elemento);
  if(elemento.foto!= null){
    this.idFoto=elemento.foto.id;
    this.fotoCliente=elemento.foto;
  }else
  {
    this.idFoto=1; //La primera imagen que se debe cargar debe ser la del Usuario por defecto
  }
}
//Muestra en la pestania actualizar el elemento seleccionado de listar
public activarActualizar(elemento) {
  console.log(elemento);
  this.seleccionarPestania(3, this.pestanias[2].pestania.nombre, 1);
  this.autocompletado.setValue(elemento);
  this.formulario.patchValue(elemento);
  this.borrarAgregados();
  this.listarAutorizado(elemento);
  this.mostrarFotoCliente(elemento);
  this.muestraImagenPc=false;
}
//Maneja los evento al presionar una tacla (para pestanias y opciones)
public manejarEvento(keycode) {
var indice = this.indiceSeleccionado;
if(keycode == 113) {
  if(indice < this.pestanias.length) {
    this.seleccionarPestania(indice+1, this.pestanias[indice].pestania.nombre, 0);
    this.formularioFoto.reset();
  } else {
    this.seleccionarPestania(1, this.pestanias[0].pestania.nombre, 0);
  }
}
}
//metodo cargar imagen
public cargandoImagen(files: FileList, e){
  this.archivo=null;
  this.archivo=files[0];
  this.muestraImagenPc=false;


  var reader = new FileReader();
  reader.onload = this.fileOnload;
  reader.readAsDataURL(this.archivo);

  console.log(e);
  console.log('imagen adjuntada');
  this.bandera=true;
  
  }

private fileOnload(e){
  var result=e.target.result;
  console.log(result);
  $('#imgSalida').attr("src",result);
  $('#imagen-nombre').empty().append('Foto cargada');
}
  
}

@Component({
  selector: 'cliente-propio-modal',
  templateUrl: 'cliente-propio-modal.html',
})
export class ClientePropioModal{
  // define el formulario para agregar un Autorizado
  public formularioAgregarAutorizado: FormGroup;

  constructor(public dialogRef: MatDialogRef<ClientePropioModal>, private autorizado: Autorizado, private autorizadoService: AutorizadoService, private toastr: ToastrService) {}

   ngOnInit() {
   //inicializa el formulario para agregar un autorizado y sus elementos
    this.formularioAgregarAutorizado= this.autorizado.formulario;
    this.obtenerSiguienteIdAutorizado();
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Obtiene el ID del proximo autorizado traido desde la base de datos y lo muestra en el campo id del formulario.
public obtenerSiguienteIdAutorizado(){
  this.autorizadoService.obtenerSiguienteId().subscribe(
    res => {
      console.log(res);
      this.formularioAgregarAutorizado.get('id').setValue(res.json());
    },
    err => {
      console.log(err);
    }
  );
  }
  //Agrega un autorizado 
public agregarAutorizado(){
  
  this.autorizadoService.agregar(this.formularioAgregarAutorizado.value).subscribe(
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
        this.toastr.error(respuesta.mensaje);
      }
    }
  );
  }
  //Reestablece los campos formularios
private reestablecerFormulario(id) {
  this.formularioAgregarAutorizado.reset();
  this.obtenerSiguienteIdAutorizado();  // this.formularioAgregarAutorizado.get('id').setValue(id);
  // this.autocompletado.setValue(undefined);
  // this.resultados = [];
  
  }
}

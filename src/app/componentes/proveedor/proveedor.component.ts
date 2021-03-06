import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { TipoFacturaService } from 'src/app/servicios/tipo-factura.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { Proveedor } from 'src/app/modelos/proveedor';
import { ListaPrecioService } from 'src/app/servicios/lista-precio.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
// define el formulario
public formulario: FormGroup;
//Define la lista completa de registros
public listaCompleta:Array<any> = [];
//Define la lista para tipo de factura
public listaTipoFactura:Array<any> = [];
//Define la lista para Precios
public listaPrecio:Array<any> = [];
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
constructor(private proveedorService: ProveedorService, private proveedor: Proveedor, private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService, private tipoFacturaService: TipoFacturaService, private listaPrecioService: ListaPrecioService) { 
  this.autocompletado.valueChanges.subscribe(data => {
    if(typeof data == 'string') {
      this.proveedorService.listarPorAlias(data).subscribe(res => {
        console.log(res.json());
        this.resultados = res.json();
      })
    }
  })
}

ngOnInit() {
  //inicializa el formulario y sus elementos
  this.formulario= this.proveedor.formulario;
  //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
  this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
    res => {
      this.pestanias= res.json();
      this.activeLink= this.pestanias[0].pestania.nombre;
    }
  );
  //Establece los valores, activando la primera pestania 
  this.seleccionarPestania(1, 'Agregar', 0);
  //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
  this.listar();
  //Cargar el campo select con la lista de tipos de factura
  this.listarTipoFactura();
  //Cargar el campo select con la lista de precios
  this.listarPrecios();
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
  case 1:
    this.obtenerSiguienteId();
    this.establecerSoloLectura(true);
    this.establecerValoresPestania(nombre, false, false, true, 'idNombre');
    break;
  case 2:
    this.reestablecerFormulario(undefined);
    this.establecerSoloLectura(false);
    this.establecerValoresPestania(nombre, true, true, false, 'idAutocompletado');
    break;
  case 3:
    this.reestablecerFormulario(undefined);
    this.establecerSoloLectura(true);
    this.establecerValoresPestania(nombre, true, false, true, 'idAutocompletado');
    break;
  case 4:
    this.reestablecerFormulario(undefined);
    this.establecerSoloLectura(false);
    this.establecerValoresPestania(nombre, true, true, true, 'idAutocompletado');
    break;
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
  this.proveedorService.obtenerSiguienteId().subscribe(
    res => {
      console.log(res.json());
      this.formulario.get('id').setValue(res.json());
    },
    err => {
      console.log(err);
    }
  );
  }
  // Carga en listaCompleta todos los registros de la DB
  private listar(){
  this.proveedorService.listar().subscribe(
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
  this.proveedorService.agregar(this.formulario.value).subscribe(
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
  this.proveedorService.actualizar(this.formulario.value).subscribe(
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
  this.proveedorService.agregar(this.formulario.get('id').value).subscribe(
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
  this.seleccionarPestania(2, this.pestanias[1].pestania.nombre, 1);
  this.autocompletado.setValue(elemento);
  this.formulario.patchValue(elemento);
  }
  //Muestra en la pestania actualizar el elemento seleccionado de listar
  public activarActualizar(elemento) {
  this.seleccionarPestania(3, this.pestanias[2].pestania.nombre, 1);
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
  // Carga en el select de Tipo de Factura
  private listarTipoFactura(){
    this.tipoFacturaService.listar().subscribe(
      res => {
        this.listaTipoFactura=res.json();
        console.log(this.listaTipoFactura);
      },
      err => {
        console.log(err);
      }
    );
  }
  // Carga en el select de Precios
  private listarPrecios(){
    this.listaPrecioService.listar().subscribe(
      res => {
        this.listaPrecio=res.json();
        console.log(this.listaPrecio);
      },
      err => {
        console.log(err);
      }
    );
  }
   //Define el mostrado de datos y comparacion en campo select
   public compareFn = this.compararFn.bind(this);
   private compararFn(a, b) {
     if(a != null && b != null) {
       return a.id === b.id;
     }
   }

   //establece solo lectura en Combo box
  private establecerSoloLectura(estado){
    if(estado){
      this.formulario.get('tipoFactura').enable();
      this.formulario.get('listaPrecio').enable();
    }
    else {
      this.formulario.get('tipoFactura').disable();
      this.formulario.get('listaPrecio').disable();
    }
  }
}
  
  
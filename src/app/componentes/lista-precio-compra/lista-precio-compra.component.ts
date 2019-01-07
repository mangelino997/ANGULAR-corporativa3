import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { ListaPrecioCompraService } from 'src/app/servicios/lista-precio-compra.service';
import { TipoFormularioService } from 'src/app/servicios/tipo-formulario.service';
import { ListaPrecioService } from 'src/app/servicios/lista-precio.service';

@Component({
  selector: 'app-lista-precio-compra',
  templateUrl: './lista-precio-compra.component.html',
  styleUrls: ['./lista-precio-compra.component.scss']
})
export class ListaPrecioCompraComponent implements OnInit {
  // define el formulario
  public formulario: FormGroup;
  //Define la lista completa de registros
  public listaAgregar:Array<any> = [];
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  //Define la lista Tipos de Formularios
  public listaTiposFormularios:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  // define el autocompletado como un formControl
  public autocompletadoPorId: FormControl=new FormControl();
  // define el autocompletado como un formControl
  public autocompletadoListarPorId: FormControl=new FormControl();
  
  //Define el form control para las busquedas vendedor
  public buscarTipoFormulario:FormControl = new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si mostrar el autocompletado por Id que se activa en todas las opciones menos en agregar
  public mostrarAutocompletadoPorId:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = false;
  
  
  //Define si la tabla de datos se muestra o no
  public mostrarTabla:boolean = true;
  //Define si en la tabla de datos, el tipo de formulario es de solo lectura o se puede modificar
  public mostrarTipoFormulario:boolean = true;
  //Define si mostrar el boton
  public mostrarBoton:boolean = null;
  //Define si columna "+" se muestra o no en la tabla
  public mostrarAccionTabla:boolean = true;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define el indice de la fila que se va a agregar a la tabla cuando se presiona el +
  public indiceFila:number = 0;
  public elementoFila:FormArray;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  //Define la lista de resultados de busqueda para tipos de formularios
  public resultadosTiposFormularios = [];
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private formBuilder: FormBuilder, private tiposFormularios: TipoFormularioService ,private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService, private listaPrecioCompraService: ListaPrecioCompraService, private listaPrecioService: ListaPrecioService) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.listaPrecioService.listarPorAlias(data).subscribe(res => {
          this.resultados = res.json();
          console.log(res.json());
        })
      }
    })
    this.autocompletadoPorId.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.listaPrecioCompraService.listarPorListaPrecio(data).subscribe(res => {
          this.resultados = res.json();
          console.log(res.json());
        })
      }
    })
    this.autocompletadoListarPorId.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.listaPrecioService.listarPorAlias(data).subscribe(res => {
          this.resultados = res.json();
          console.log(res.json());

        })
      }
    })
    
    //Autocompletado - Buscar por Tipo de formulario
    this.buscarTipoFormulario.valueChanges.subscribe(data => {
        if(typeof data == 'string') {
          this.tiposFormularios.listarPorNombre(data).subscribe(response =>{
            this.resultadosTiposFormularios = response.json();
            console.log(response.json());
          })
        }
    })
   }

  ngOnInit() {
    //Define los campos para validaciones
    this.formulario = this.formBuilder.group({
      listaPrecio: new FormControl('', Validators.required),
      tipoFormulario: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    });
    //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
    this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
      res => {
        this.pestanias= res.json();
        this.activeLink= this.pestanias[0].pestania.nombre;
      }
    );
    //Establece los valores, activando la primera pestania 
    this.seleccionarPestania(1, 'Agregar', 0);
    //Cargar en listatiposFormularios los tipos que existen
    this.listarTiposFormularios();
    //Cargamos la listacompleta
    this.listar();
    
  }
  //mostrar datos formulario
  public mostrar(){
    console.log(this.formulario.value);
  }
  //Establece el formulario al seleccionar elemento del autocompletado (se ejecuta en la pestaña agregar)
  public cambioAutocompletado(elemento) {
    this.formulario.patchValue(elemento);
  }
  //Establece el formulario al seleccionar elemento del autocompletado por Id listaPrecio (se ejecuta en las demás pestañas menos en "Agregar")
  public cambioAutocompletadoPorId(elemento) {
    // console.log(elemento);
    this.listaPrecioCompraService.listarPorListaPrecio(elemento.id).subscribe(
      res => {
        this.listaAgregar=res.json();
      },
      err => {
        console.log(err);
      }
    );
    this.formulario.patchValue(elemento);
  }
  
  public cambioAutocompletadoListarPorId(elemento) {
    // console.log(elemento);
    this.listaPrecioCompraService.listarPorListaPrecio(elemento.id).subscribe(
      res => {
        this.listaAgregar=res.json().value;
      },
      err => {
        console.log(err);
      }
    );
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
  private establecerValoresPestania(nombrePestania, autocompletado, soloLectura, boton, mostrarTipoFormulario, autocompletadoPorId, componente) {
    this.pestaniaActual = nombrePestania;
    this.mostrarAutocompletado = autocompletado;
    this.soloLectura = soloLectura;
    this.mostrarBoton = boton;
    this.mostrarTipoFormulario= mostrarTipoFormulario;
    this.mostrarAutocompletadoPorId= autocompletadoPorId;
    this.reestablecerFormulario(undefined);
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
      this.mostrarTabla=true;
      this.establecerAccionTabla(true);
      this.establecerValoresPestania(nombre, true, false, true, false, false, 'idNombre');
      this.limpiarArray();
      break;
    case 2:
      this.mostrarTabla=true;
      this.establecerAccionTabla(false);
      this.establecerValoresPestania(nombre, false, true, false, true, true, 'idAutocompletado');
      this.limpiarArray();
      break;
    case 3:
      this.mostrarTabla=true;
      this.establecerAccionTabla(true);
      this.establecerValoresPestania(nombre, false, false, true, true, true, 'idAutocompletado');
      this.limpiarArray();
      break;
    case 4:
      this.mostrarTabla=false;
      this.establecerValoresPestania(nombre, false, true, true, true, true, 'idAutocompletado');
      this.limpiarArray();
      break;
    case 5:
      this.mostrarTabla=true;
      this.establecerAccionTabla(false);
      this.establecerValoresPestania(nombre, false, false, true, true, true,'idAutocompletado');
      this.limpiarArray();
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
//Obtiene el estado y define si muestra o no la accion "+" en la tabla de datos
private establecerAccionTabla(estado){
  this.mostrarAccionTabla=estado;
}
//Obtiene el ID del modulo traido desde la base de datos y lo muestra en el campo id del formulario.
  private obtenerSiguienteId(){
    this.listaPrecioCompraService.obtenerSiguienteId().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  // Carga en listaCompleta todos los registros de la DB
  public listar(){
    this.listaPrecioCompraService.listar().subscribe(
      res => {
        this.listaCompleta=res.json();
        console.log(this.listaCompleta);
      },
      err => {
        console.log(err);
      }
    );
  }
  //Elimina todos los elementos cargados en el array listaAgregar
  public limpiarArray(){
    this.listaAgregar.splice(0, this.listaAgregar.length);
  }
  //Agrega un registro 
  private agregar(){
    console.log(this.listaAgregar);
    this.listaPrecioCompraService.agregarLista(this.listaAgregar).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 201) {
          this.reestablecerFormulario(respuesta.id);
          this.formulario.reset();
          setTimeout(function() {
            document.getElementById('idAutocompletado').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
          this.limpiarArray();
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("idPrecio").classList.add('is-invalid');
          document.getElementById("idPrecio").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }
  //Actualiza un registro
  private actualizar(){
    console.log(this.listaAgregar);
    this.listaPrecioCompraService.actualizarLista(this.listaAgregar).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 200) {
          this.reestablecerFormulario(undefined);
          setTimeout(function() {
            document.getElementById('idAutocompletado').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
          this.limpiarArray();
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("labelPecio").classList.add('label-error');
          document.getElementById("idPrecio").classList.add('is-invalid');
          document.getElementById("idPrecio").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }
  //Elimina un registro
  private eliminar(){
    this.listaPrecioCompraService.agregar(this.formulario.get('id').value).subscribe(
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
    // this.formulario.get('id').setValue(id);
    this.autocompletado.setValue(undefined);
    this.buscarTipoFormulario.setValue(undefined);
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
   //Define el mostrado de datos y comparacion en campo select
   public compareFn = this.compararFn.bind(this);
   private compararFn(a, b) {
     if(a != null && b != null) {
       return a.id === b.id;
     }
   }
  //Agrega una fila a la segunda tabla
  public agregarElemento() {
    this.listaAgregar.push(this.formulario.value);
    if(this.listaAgregar.length<1){
      this.autocompletado.enable();
    }
    else{
      this.autocompletado.disable();
    }
    this.buscarTipoFormulario.setValue(undefined);
    this.formulario.reset();
    setTimeout(function() {
      document.getElementById('idTipoFormulario').focus();
    }, 20);
  }
  //Elimina una fila de la segunda tabla
  public eliminarElemento(indice) {
    this.listaAgregar.splice(indice, indice+1);
    if(this.listaAgregar.length<1){
      this.autocompletado.enable();
    }
    else{
      this.autocompletado.disable();
    }
    this.buscarTipoFormulario.setValue(undefined);
    this.formulario.reset();
    setTimeout(function() {
      document.getElementById('idTipoFormulario').focus();
    }, 20);
  }
  //Manejo de cambio de autocompletado de tipo formulario
  public cambioAutocompletadoListaPrecioCompra(elemento) {
    this.formulario.get('listaPrecio').setValue(this.autocompletado.value);
    this.formulario.get('tipoFormulario').setValue(elemento);
  }
  // Carga en el select tipos de formularios
  private listarTiposFormularios(){
    this.tiposFormularios.listar().subscribe(
      res => {
        this.listaTiposFormularios=res.json();
        console.log(this.listaTiposFormularios);
      },
      err => {
        console.log(err);
      }
    );
  }
}

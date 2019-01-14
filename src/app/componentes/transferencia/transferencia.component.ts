import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoFormularioService } from 'src/app/servicios/tipo-formulario.service';
import { ListaPrecioCompraService } from 'src/app/servicios/lista-precio-compra.service';
import { Transferencia } from 'src/app/modelos/transferencia';
import { TransferenciaService } from 'src/app/servicios/transferencia.service';
import { FormularioMostradorService } from 'src/app/servicios/formulario-mostrador.service';
import { FormularioAlmacenService } from 'src/app/servicios/formulario-almacen.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {
  // define el formulario de la pestaña "Transferencia de Almacen a Mostrador"
  public formulario: FormGroup;
  // define el formulario de la pestaña "Transferencia de Mostrador a Almacén"
  public formulario2: FormGroup;
  // define el formulario transferencia"
  public formulariosTransferencia: FormGroup;
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  //Define la lista completa de registros
  public listaAgregar:Array<any> = [];
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

  //Define si habilita el boton agregar
  public habilitado:boolean = false;
  
  //Define si el campo es de solo lectura
  public soloLectura:boolean = true;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  // define al input cantidad como un FormControl 
  public cantidad: FormControl=new FormControl();
  // define al input importe como un FormControl 
  public importe: FormControl=new FormControl();

  public elemento: Array<any> = [];

  //Define el form control para las busquedas vendedor
  public buscarTipoFormulario:FormControl = new FormControl();
  //Define la lista de resultados de busqueda para tipos de formularios
  public resultadosTiposFormularios = [];

  constructor(private formularioMostradorService: FormularioMostradorService, private formularioAlmacenService: FormularioAlmacenService, private transferenciaService: TransferenciaService ,private listaPrecioCompraService: ListaPrecioCompraService, private transferencia: Transferencia, private tiposFormularios: TipoFormularioService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    //Autocompletado - Buscar por Tipo de formulario
    this.buscarTipoFormulario.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.tiposFormularios.listarPorNombre(data).subscribe(response =>{
          this.resultadosTiposFormularios = response.json();
          console.log(response.json());
        })
      }
    })
    //Establece la pestania activa por defecto
    this.activeLink = 1;
    //Establece el indice activo por defecto
    this.indiceSeleccionado = 1;
    //
   }

  ngOnInit() {
    //obtenemos la fecha actual
    var dateDay = new Date().toISOString().substring(0,10);
    //inicializa el formulario y sus elementos
    this.formulario= this.transferencia.formulario;
    this.formulario.get('fecha').setValue(dateDay);

    //inicializa el formulario y sus elementos
    this.formulario2= this.transferencia.formulario;
    this.formulario.get('fecha').setValue(dateDay);
    //define el formulario de FormularioTransferencia que es de tipo array (puede tener varias filas)
    this.formulariosTransferencia = this.formBuilder.group({
      id: '',
      version: '',
      numeracion: '',
      cantidad: 0,
      monto: 0,
      tipoFormulario: this.formBuilder.group({
        id: '',
        version: '',
        nombre: ''
      })
    });

  }
  //Elimina todos los elementos cargados en el array listaAgregar
  public limpiarArray(){
    this.listaAgregar.splice(0, this.listaAgregar.length);
  }
  //Agrega una fila a la  tabla
  public agregarElemento() {
    this.listaAgregar.push(this.formulariosTransferencia.value);
    let monto=<number>this.formulariosTransferencia.get('monto').value;
    let montoTotal= <number>this.formulario.get('montoTotal').value;
    let importeTotal: number= montoTotal + monto;
    this.formulario.get('montoTotal').setValue(importeTotal);
    this.buscarTipoFormulario.reset();
    this.cantidad.reset();
    this.importe.reset();
    document.getElementById('idTipoFormulario').focus();
  }
  //Elimina una fila de la segunda tabla
  public eliminarElemento(indice, montoRestar) {
    let montoTotal= this.formulario.get('montoTotal').value;
    this.formulario.get('montoTotal').setValue(montoTotal-montoRestar);
    this.listaAgregar.splice(indice, 1); 
  }
  //Manejo de cambio de autocompletado de tipo formulario
  public cambioAutocompletadoTipoFormulario() {
    this.formulariosTransferencia.get('tipoFormulario').setValue(this.buscarTipoFormulario);
  }
  //calcula el importe recibiendo como parametro el tipo, si es 0 estamos en la pestaña "Transf de alm a mostrador"
  public calcularImporte(tipoPestaña){
    if(this.formulariosTransferencia.get('tipoFormulario.id').value!=null&& this.cantidad.value!=null){
      this.formulariosTransferencia.get('cantidad').setValue(this.cantidad.value);
      //obtenemos el importe (lo calcula el servidor al pasarle como parametros el idTipoFormulario, cantidad y tipo)
      this.listaPrecioCompraService.obtenerPorTipoFormularioYCantidadYTipo(this.formulariosTransferencia.get('tipoFormulario.id').value, this.cantidad.value, tipoPestaña).subscribe(response =>{
        this.importe.setValue(response.json());
        this.formulariosTransferencia.get('monto').setValue(this.importe.value);
        console.log(this.formulariosTransferencia.value);
      });
      if(tipoPestaña==0){
        this.formularioAlmacenService.listarNumeracionDesdeHasta(this.formulariosTransferencia.get('tipoFormulario.id').value, this.cantidad.value).subscribe(
          response=>{
          let primerIndice=0;
          let segundoIndice=1;
          let mostrarNumeracion="";
          try{
            let respuesta= response.json();
            for(let i=0; i<response.json().length; i++){
              while(response.json()[segundoIndice]!= undefined){
                mostrarNumeracion=mostrarNumeracion+response.json()[primerIndice]+"->"+response.json()[segundoIndice]+ ", ";
                primerIndice+=2;
                segundoIndice+=2;
              }
              (<HTMLInputElement>document.getElementById("idBotonAgregar")).disabled=false;
            }
            this.formulariosTransferencia.get('numeracion').setValue(mostrarNumeracion);
          }catch(e){
            this.buscarTipoFormulario.reset();
            this.cantidad.reset();
            document.getElementById("idTipoFormulario").focus();
            this.toastr.error("No existe numeración");
            (<HTMLInputElement>document.getElementById("idBotonAgregar")).disabled=true;
          }
        },
        err => {
          var respuesta = err.json();
          document.getElementById("idTipoFormulario").focus();
          this.toastr.error(respuesta.mensaje);
        }
        )
      }
      else{
        this.formularioMostradorService.listarNumeracionDesdeHasta(this.formulariosTransferencia.get('tipoFormulario.id').value, this.cantidad.value).subscribe(
          response=>{
          let primerIndice=0;
          let segundoIndice=1;
          let mostrarNumeracion="";
          
          try{
            let respuesta= response.json();
            for(let i=0; i<response.json().length; i++){
              while(response.json()[segundoIndice]!= undefined){
                mostrarNumeracion=mostrarNumeracion+response.json()[primerIndice]+"->"+response.json()[segundoIndice]+ ", ";
                primerIndice+=2;
                segundoIndice+=2;
              }
              (<HTMLInputElement>document.getElementById("idBotonAgregar")).disabled=false;
            }
            this.formulariosTransferencia.get('numeracion').setValue(mostrarNumeracion);
          }catch(e){
            this.buscarTipoFormulario.reset();
            this.cantidad.reset();
            document.getElementById("idTipoFormulario").focus();
            this.toastr.error("No existe numeración");
            (<HTMLInputElement>document.getElementById("idBotonAgregar")).disabled=true;
          }
        },
        err => {
          var respuesta = err.json();
          document.getElementById("idTipoFormulario").focus();
          this.toastr.error(respuesta.mensaje);
        }
        )
      }
    }
    else{
      this.importe.setValue(0);
      (<HTMLInputElement>document.getElementById("idBotonAgregar")).disabled=true;
      
    }
    
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.nombre ? elemento.nombre : elemento;
    } else {
      return elemento;
    }
  }
  //Agrega un registro 
public agregar(tipo){
  this.formulario.get('tipo').setValue(tipo); //el 0 corresponde al tipo de Numeracion de "almacen a mostrador", el 1 de "mostrador a almacen"
  this.formulario.get('formulariosTransferencia').setValue(this.listaAgregar);// Agrego el array de formularios a transferir agregados
  console.log(this.formulario.value);
  this.transferenciaService.agregar(this.formulario.value).subscribe(
    res => {
      var respuesta = res.json();
      if(respuesta.codigo == 201) {
        this.buscarTipoFormulario.reset();
        this.cantidad.reset();
        this.importe.reset();
        this.formulario.reset();
        this.reestablecerFormulario();
        setTimeout(function() {
          document.getElementById('idTipoFormulario').focus();
        }, 20);
        this.toastr.success(respuesta.mensaje);
      }
    },
    err => {
      var respuesta = err.json();
      if(respuesta.codigo == 11002) {
        document.getElementById("idTipoFormulario").focus();
        this.toastr.error(respuesta.mensaje);
      }
    }
  );
}
//Reestablece los campos formularios
private reestablecerFormulario() {
  this.formulario.reset();
  // this.formulario.get('id').setValue(id);
  this.autocompletado.setValue(undefined);
  this.listaAgregar = [];
}


}

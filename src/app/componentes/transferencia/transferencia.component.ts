import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { ListaPrecioVentaService } from 'src/app/servicios/lista-precio-venta.service';
import { TipoFormularioService } from 'src/app/servicios/tipo-formulario.service';
import { ListaPrecioService } from 'src/app/servicios/lista-precio.service';
import { ModalidadPagoService } from 'src/app/servicios/modalidad-pago.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { ListaPrecioCompraService } from 'src/app/servicios/lista-precio-compra.service';
import { FacturaCompraService } from 'src/app/servicios/factura-compra.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientePropioService } from 'src/app/servicios/cliente-propio.service';
import { FormularioMostradorService } from 'src/app/servicios/formulario-mostrador.service';
import { FacturaVentaService } from 'src/app/servicios/factura-venta.service';
import { Transferencia } from 'src/app/modelos/transferencia';

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

  constructor(private listaPrecioCompraService: ListaPrecioCompraService, private transferencia: Transferencia, private tiposFormularios: TipoFormularioService, private formBuilder: FormBuilder, private toastr: ToastrService) {
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
    //inicializa el formulario y sus elementos
    this.formulario2= this.transferencia.formulario;
    //define el formulario de FormularioTransferencia que es de tipo array (puede tener varias filas)
    this.formulariosTransferencia = this.formBuilder.group({
      id: new FormControl(),
      version: new FormControl(),
      numeracion: new FormControl(),
      cantidad: new FormControl(),
      monto: new FormControl( ),
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
  //Agrega una fila a la segunda tabla
  public agregarElemento() {
    this.formulariosTransferencia.setValue(this.elemento);
    this.listaAgregar.push(this.formulariosTransferencia.value);
    // if(this.listaAgregar.length<1){
    //   this.listaPrecioDisable= true;
    // }
    // else{
    //   this.listaPrecioDisable= false;
    // }
  }
  //Manejo de cambio de autocompletado de tipo formulario
  public cambioAutocompletadoTipoFormulario(elemento) {
    this.formulariosTransferencia= elemento;
    console.log(this.formulariosTransferencia);
  }
  //calcula el importe recibiendo como parametro el tipo, si es 0 estamos en la pestaña "Transf de alm a mostrador"
  public calcularImporte(tipo){
    if(this.formulariosTransferencia.get('id').value!=null&& this.cantidad.value!=null){
      this.formulario.get('formulariosTransferencia.cantidad').setValue(this.cantidad.value);
      //obtenemos el importe (lo calcula el servidor al pasarle como parametros el idTipoFormulario, cantidad y tipo)
      this.listaPrecioCompraService.obtenerPorTipoFormularioYCantidadYTipo(this.formulario.get('formulariosTransferencia.tipoFormulario.id').value, this.cantidad.value, tipo).subscribe(response =>{
        this.importe.setValue(response.json());
        console.log(response.json());
      })
    }
    else{
      this.importe.setValue(0);
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
}

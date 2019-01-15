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

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {
  // define el formulario
  public formulario: FormGroup;
  // define el formulario para la pestaña Consultar
  public formularioConsulta: FormGroup;
  //Define la lista completa de registros
  public listaAgregar:FormArray;
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
  // define al input fechaActual como un formControl
  public fecha: FormControl=new FormControl();
  // define al input cantidad como un FormControl (input de cada fila de la tabla)
  public cantidad: FormControl=new FormControl();
  // define al input Precio factura el monto total
  public montoPrecioFactura: number=0;
  //Define el form control para las busquedas vendedor
  public buscarTipoFormulario:FormControl = new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si mostrar el autocompletado por Id que se activa en todas las opciones menos en agregar
  public mostrarAutocompletadoPorId:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = true;
  //Define si el campo listaPrecio se deshabilita o no
  public listaPrecio:number;
  
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
  //Define el id Lista Precio del proveedor seleccionado
  public idListaPrecio:number = 0;

  public elementoFila:FormArray;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  //Define la lista de resultados de busqueda para tipos de formularios
  public resultadosTiposFormularios = [];

  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosModalidadPago = [];
  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosProveedor = [];

  //Define el form control para las busquedas de Modalidad de Pagos
  public idModalidadPago:FormControl = new FormControl();
  //Define el form control para las busquedas de Proveedores
  public idProveedor:FormControl = new FormControl();
  //Define el form control para el precio unitario
  // public precioUnitario:FormControl = new FormControl();
  //Define el form control para las busquedas de Proveedores
  public tipoFactura:FormControl = new FormControl();

  //Define el tipo de Modalidad de pago si es =0 (Descuento) y si es =1 (Incremento)
  public tipoModalidadPago:string = null;

  // VARIABLES PARA LA PESTAÑA CONSULTAR
  //campo fechaConsulta como un FormControl
  public fechaConsulta: FormControl=new FormControl();
  //campo numeroFacturaConsulta como un FormControl
  public numeroFacturaConsulta: FormControl=new FormControl();
  //campo modalidadPagoConsulta como un FormControl
  public idModalidadPagoConsultar: FormControl=new FormControl();
  //campo proveedorConsulta como un FormControl
  public idProveedorConsultar: FormControl=new FormControl();
  
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private toastr: ToastrService, private facturaCompraService: FacturaCompraService, private listaPrecioCompraService: ListaPrecioCompraService, private tiposFormularios: TipoFormularioService, private modalidadPagoService: ModalidadPagoService, private proveedorService: ProveedorService) {
    //Autocompletado - Buscar por modalidad de Pago
    this.idModalidadPago.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.modalidadPagoService.listarPorAlias(data).subscribe(response =>{
            this.resultadosModalidadPago = response.json();
          })
        }
    })
    //Autocompletado - Buscar por proveedor
    this.idProveedor.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.proveedorService.listarPorAlias(data).subscribe(response =>{
            this.resultadosProveedor = response.json();
          })
        }
    })
    //Autocompletado - Buscar por modalidad de Pago en pestaña consultar
    this.idModalidadPagoConsultar.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.modalidadPagoService.listarPorAlias(data).subscribe(response =>{
            this.resultadosModalidadPago = response.json();
          })
        }
    })
    //Autocompletado - Buscar por proveedor en pestaña consultar
    this.idProveedorConsultar.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.proveedorService.listarPorAlias(data).subscribe(response =>{
            this.resultadosProveedor = response.json();
          })
        }
    })
    //Autocompletado - Buscar por Tipo de formulario
    this.buscarTipoFormulario.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.tiposFormularios.listarPorNombre(data).subscribe(response =>{
          this.resultadosTiposFormularios = response.json();
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
    //Define los campos para validaciones
    this.formulario = this.formBuilder.group({
      numero: new FormControl(),
      fecha: new FormControl(),
      increDesc: new FormControl(),
      monto: new FormControl(),
      tipoFormulario: new FormControl(),
      modalidadPago: this.formBuilder.group({
        id: ""
      }),
      proveedor: this.formBuilder.group({
        id: ""
      }),
      formulariosCompra: this.formBuilder.array([this.crearformulariosCompra()])
    });
    this.formularioConsulta = this.formBuilder.group({
      fecha: new FormControl(),
      numero: new FormControl(),
      modalidadPago: new FormControl(),
      proveedor: new FormControl(),
    });
    this.formulario.get('fecha').setValue(dateDay);
    this.formularioConsulta.get('fecha').setValue(dateDay);
    this.formulario.get('increDesc').setValue(0);
    setTimeout(function() {
      document.getElementById('idFecha').focus();
    }, 20);
    
  }

//declaramos los metodos para utilizar el Modal/Dialog
public openDialog(formulariosFacturas): void {
  const dialogRef = this.dialog.open(FacturasModal, {
    width: '950px',
    //los formularios que paso desde el html en cada ver son asignados a la variable formularios para que pueda leerlos desde la ventana factura-modal.html
    data: {formularios: formulariosFacturas},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

//Crea formulariosCompra para la tabla (cada fila que se agrega)
private crearformulariosCompra(): FormGroup {
  return this.formBuilder.group({
    precioUnitario: '',
    numeracionDesde: '',
    numeracionHasta: '',
    cantidad: '',
    montoTotal: '',
    tipoFormulario: this.formBuilder.group({
      id: ""
    })
  })
}
//verifica si el numero ingresado ya existe en la base de datos.
public verificar(){
  this.facturaCompraService.verificarFacturaExistentePorNumero(this.formulario.get('numero').value).subscribe(res=>{
    if(res.json()==true){
      this.toastr.error("El N° de Factura ingresado ya existe. Ingrese uno nuevo!");
      this.formulario.get('numero').setValue("");
      setTimeout(function() {
        document.getElementById('idNumeroFactura').focus();
      }, 20);
    }
  });
}
//Formatea el valor del autocompletado
public displayFn(elemento) {
  if(elemento != undefined) {
    return elemento.nombre ? elemento.nombre : elemento;
  } else {
    return elemento;
  }
}
//Establece el valor del campo TipoFactura al seleccionar el proveedor del autocompletado
public cambioAutocompletadoProveedor(elemento) {
  this.tipoFactura.setValue(elemento.tipoFactura.nombre);
  this.formulario.patchValue(elemento);
  this.formulario.get('proveedor.id').setValue(elemento.id);
  this.idListaPrecio=elemento.listaPrecio.id; 
}
//Establece el valor del titulo en el campo "Incremento/Descuento ($)"
public cambioIncrementoDescuento(elemento){
  this.tipoModalidadPago="";
  if(elemento.tipo==0){
    this.tipoModalidadPago= "Descuento";
  }
  else{
    this.tipoModalidadPago= "Incremento";
  }
  this.formulario.get('modalidadPago.id').setValue(elemento.id);
}
//Agrega una fila a la segunda tabla
public agregarElemento() {
  // this.listaAgregar.push(this.formulario.value);
  this.listaAgregar = this.formulario.get('formulariosCompra') as FormArray;
  this.listaAgregar.push(this.crearformulariosCompra());
}
//Elimina una fila de la segunda tabla
public eliminarElemento(indice) {
  this.listaAgregar.removeAt(indice);
}
//Manejo de cambio de autocompletado de tipo formulario
public cambioAutocompletadoTipoFormulario(indice) {
  this.formulario.get('tipoFormulario').setValue(this.buscarTipoFormulario.value.id);
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('tipoFormulario.id').setValue(this.buscarTipoFormulario.value.id);
  //obtenemos el precio de ListaPrecioCompra al tener los id (idListaPrecio, idTipoDeFormulario) necesarios para la consulta
  this.listaPrecioCompraService.obtenerPorListaPrecioYTipoFormulario(this.idListaPrecio, this.buscarTipoFormulario.value.id).subscribe(response =>{
    (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('precioUnitario').setValue(response.json().precio);
  })
}
//Evento que calcula la "cantidad" como diferencia entre N° Hasta y N° Desde mas uno
public calcularCantidad(indice){
  let calculoCantidad: number= (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('numeracionHasta').value-(<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('numeracionDesde').value+1;
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('cantidad').setValue(calculoCantidad);
  let calculoMontoTotal=calculoCantidad*(<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('precioUnitario').value;
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('montoTotal').setValue(calculoMontoTotal);
  this.montoPrecioFactura=this.montoPrecioFactura+calculoMontoTotal;
  this.formulario.get('monto').setValue(this.montoPrecioFactura);
}
//Aplica descuento o incremento dependiendo el tipo de modalidad de Pago seleccionado
public aplicarDescuentoIncremento(){
  this.formulario.get('monto').setValue(this.montoPrecioFactura);
  if(this.tipoModalidadPago== "Descuento"){
    this.formulario.get('monto').setValue(this.formulario.get('monto').value-this.formulario.get('increDesc').value);
  }
  else{
    this.formulario.get('monto').setValue(this.formulario.get('monto').value+this.formulario.get('increDesc').value);
  }
}
//Agrega un registro 
public agregar(){
  //pregunto si el campo IncreDesc es nulo o no, porque no se realizará el agregar registro si dicho campo es nulo
  //si es nulo le seteo como valor 0
  if(this.formulario.get('increDesc').value==null){
    this.formulario.get('increDesc').setValue(0);
  }
  this.facturaCompraService.agregar(this.formulario.value).subscribe(
    res => {
      var respuesta = res.json();
      if(respuesta.codigo == 201) {
        this.reestablecerFormulario(respuesta.id);
        this.formulario.reset();
        setTimeout(function() {
          document.getElementById('idFecha').focus();
        }, 20);
        this.toastr.success(respuesta.mensaje);
      }
    },
    err => {
      var respuesta = err.json();
      if(respuesta.codigo == 11002) {
        document.getElementById("idFecha").focus();
        this.toastr.error(respuesta.mensaje);
      }
    }
  );
}
//buscar Factura Compra de la pestaña consultar
public buscar(){
  if(this.idProveedorConsultar.value==""){
    this.formularioConsulta.get('proveedor').setValue(null);
  }else{
    this.formularioConsulta.get('proveedor').setValue(this.idProveedorConsultar.value);
  }
  if(this.idModalidadPagoConsultar.value==""){
    this.formularioConsulta.get('modalidadPago').setValue(null);
  }else{
    this.formularioConsulta.get('modalidadPago').setValue(this.idModalidadPagoConsultar.value);
  }
  this.facturaCompraService.listarPorFiltros(this.formularioConsulta.value).subscribe(res =>{
    this.listaCompleta= res.json();
  });
}
//Reestablece los campos formularios
private reestablecerFormulario(id) {
  this.formulario.reset();
  this.formularioConsulta.reset();
  var dateDay = new Date().toISOString().substring(0,10);
  this.formulario.get('fecha').setValue(dateDay);
  this.formularioConsulta.get('fecha').setValue(dateDay);
  setTimeout(function() {
    document.getElementById('idFecha').focus();
  }, 20);
  this.idModalidadPago.setValue(null);
  this.idProveedor.setValue(null);
  this.tipoFactura.setValue(null);
  this.buscarTipoFormulario.setValue(null);
  this.autocompletado.setValue(undefined);
  this.resultados = [];
  this.tipoModalidadPago=null;
  }
}

@Component({
  selector: 'factura-modal',
  templateUrl: 'factura-modal.html',
})
export class FacturasModal{
  //Define la lista completa de registros
  public listaCompletaDeFormularios:FormArray ;

  constructor(public dialogRef: MatDialogRef<FacturasModal>, @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit() {
    this.listaCompletaDeFormularios=this.data.formularios;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

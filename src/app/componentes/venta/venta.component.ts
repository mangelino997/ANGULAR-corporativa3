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

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
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
  //Define el form control para guardar los datos completos del cliente propio
  public infoClientePropio:FormControl = new FormControl();
  
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si mostrar el autocompletado por Id que se activa en todas las opciones menos en agregar
  public mostrarAutocompletadoPorId:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = true;
  //Define si el campo inputsClienteEventual se activa o no
  public inputsClienteEventual:boolean = false;
  //Define si el campo inputClientePropio se activa o no
  public inputClientePropio:boolean = false;
  
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
  //Define el id Lista Precio del autocompletado
  public idListaPrecio:number = 0;
  //Define el id del Tipo de formulario
  public idTipoFormulario:number = 0;
  //Define el id de la modalidad de pago seleccionada (si es CuentaCorriente el id=0 y mostrará el input "Abona($)", sino lo oculta)
  public modalidadPago:boolean = false;
  

  public elementoFila:FormArray;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  //Define la lista de resultados de busqueda para tipos de formularios
  public resultadosTiposFormularios = [];
  //Define la lista de resultados de busqueda para tipos de formularios
  public resultadosListaPrecio = [];
  

  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosModalidadPago = [];
  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosCliente = [];
  //Define el form control para las busquedas de Clientes
  public idCliente:FormControl = new FormControl();
  //Define el form control para las busquedas de Clientes en la pestaña Consultar
  public idClienteConsultar:FormControl = new FormControl();
  //Define el form control para las busquedas de Lista Precios
  public listaPrecio:FormControl = new FormControl();
  //Define el form control para las busquedas de Modalidad de Pagos
  public idModalidadPago:FormControl = new FormControl();
  //Define el form control para las busquedas de Proveedores
  public tipoFactura:FormControl = new FormControl();

  //Define el tipo de Modalidad de pago si es =0 (Descuento) y si es =1 (Incremento)
  public tipoModalidadPago:string = null;
  //Define el form control para tipo de Cliente
  public tipoCliente:FormControl = new FormControl();
  

  // VARIABLES PARA LA PESTAÑA CONSULTAR
  //campo fechaConsulta como un FormControl
  public fechaConsulta: FormControl=new FormControl();
  //campo numeroFacturaConsulta como un FormControl
  public numeroFacturaConsulta: FormControl=new FormControl();
  //campo modalidadPagoConsulta como un FormControl (pestaña Consultar)
  public idModalidadPagoConsultar: FormControl=new FormControl();
  //campo proveedorConsulta como un FormControl
  public idProveedorConsultar: FormControl=new FormControl();
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(public dialog: MatDialog, private formularioMostradorServices: FormularioMostradorService, private clienteService: ClientePropioService, private listaPrecioService: ListaPrecioService, private listaPrecioVentaService: ListaPrecioVentaService, private formBuilder: FormBuilder, private toastr: ToastrService, private facturaCompraService: FacturaCompraService, private facturaVentaService: FacturaVentaService, private listaPrecioCompraService: ListaPrecioCompraService, private tiposFormularios: TipoFormularioService, private modalidadPagoService: ModalidadPagoService, private proveedorService: ProveedorService) {

    //Autocompletado - Buscar por proveedor
    this.listaPrecio.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.listaPrecioService.listarPorAlias(data).subscribe(response =>{
            this.resultadosListaPrecio = response.json();
          })
        }
    })
    //Autocompletado - Buscar por cliente propio
    this.idCliente.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.clienteService.listarPorAlias(data).subscribe(response =>{
            this.resultadosCliente = response.json();
          })
        }
    })
    //Autocompletado - Buscar por cliente propio en la pestaña Consultar
    this.idClienteConsultar.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.clienteService.listarPorAlias(data).subscribe(response =>{
            this.resultadosCliente = response.json();
          })
        }
    })
    //Autocompletado - Buscar por modalidad de Pago
    this.idModalidadPago.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.modalidadPagoService.listarPorAlias(data).subscribe(response =>{
            this.resultadosModalidadPago = response.json();
          })
        }
    })
    //Autocompletado - Buscar por modalidad de Pago en la pestaña Consultar
    this.idModalidadPagoConsultar.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.modalidadPagoService.listarPorAlias(data).subscribe(response =>{
            this.resultadosModalidadPago = response.json();
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
      numeroA: new FormControl(),
      numeroB: new FormControl(),
      fecha: new FormControl(),
      increDesc: new FormControl(),
      monto: new FormControl(),
      nombre: new FormControl(),
      dni: new FormControl(),
      domicilio: new FormControl(),
      telefono: new FormControl(),
      pago: new FormControl(),
      modalidadPago: this.formBuilder.group({
        id: ""
      }),
      clientePropio: this.formBuilder.group({
        id: ""
      }),
      formulariosVenta: this.formBuilder.array([this.crearformulariosVenta()])
    });
    this.formularioConsulta = this.formBuilder.group({
      fecha: new FormControl(),
      numeroRecibo: new FormControl(),
      modalidadPago: new FormControl(),
      clientePropio: new FormControl()
    });
    this.formulario.get('fecha').setValue(dateDay);
    this.formularioConsulta.get('fecha').setValue(dateDay);
    this.formulario.get('increDesc').setValue(0);
    //cargamos numero de recibo
    this.facturaVentaService.obtenerSiguienteNumero().subscribe(res=>{
      this.formulario.get('numero').setValue(res.json().numeroCompleto);
      this.formulario.get('numeroA').setValue(res.json().numeroCompleto.split('-')[0]);
      this.formulario.get('numeroB').setValue(res.json().numeroCompleto.split('-')[1]);
    });
  
  }

  //declaramos los metodos para utilizar el Modal/Dialog
public openDialog(formulariosFacturas): void {
  const dialogRef = this.dialog.open(FacturasVentaModal, {
    width: '950px',
    //los formularios que paso desde el html en cada ver son asignados a la variable formularios para que pueda leerlos desde la ventana factura-modal.html
    data: {formularios: formulariosFacturas},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

//Crea formulariosCompra para la tabla (cada fila que se agrega)
private crearformulariosVenta(): FormGroup {
  return this.formBuilder.group({
    autoTipoFormulario: '',
    precioUnitario: '',
    numeracion: '',
    cantidad: '',
    montoTotal: '',
    tipoFormulario: this.formBuilder.group({
      id: ""
    }),
    listaPrecio: this.formBuilder.group({
      id: ""
    })
  })
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
  // this.idListaPrecio=elemento.listaPrecio.id; 
  // console.log("id lista porecio del proveedor "+this.idListaPrecio);
  // console.log(this.formulario.get('proveedor.id').value);
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
  console.log(elemento.id);
  if(elemento.id==5){
    this.modalidadPago= true; //si es cuenta corriente muestro el input "Abona ($)". El Id de CuentaCorriente esta seteado en 5
  }
  else{
    this.modalidadPago= false;
  }
}
//Establece los inputs segund el tipo de cliente
public mostrarInputTipoCliente(){
  if(this.tipoCliente.value==0){
    this.inputClientePropio= true;
    this.inputsClienteEventual= false;
  }
  else{
    this.inputClientePropio= false;
    this.inputsClienteEventual= true;
  }
}
//Establece el valor del id del Cliente propio seleccionado 
public cambioAutocompletadoClientePropio(idCliente, cliente){
  this.formulario.get('clientePropio.id').setValue(idCliente);
  this.infoClientePropio= cliente;
}
//Establece el valor del id de la Lista de Precio seleccionada
public cambioAutocompletadoListaPrecio(idListaPrecio){
  this.idListaPrecio= idListaPrecio;
  console.log(this.idListaPrecio);
}
//Agrega una fila a la segunda tabla
public agregarElemento() {
  // this.listaAgregar.push(this.formulario.value);
  this.listaAgregar = this.formulario.get('formulariosVenta') as FormArray;
  this.listaAgregar.push(this.crearformulariosVenta());
}
//Elimina una fila de la  tabla
public eliminarElemento(indice) {
  //restar el montoTotal de la fila que se elimina 
  let calculoMontoTotal=(<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').value;
  this.formulario.get('monto').setValue(this.formulario.get('monto').value-calculoMontoTotal)
  //luego eliminamos la fila
  this.listaAgregar.removeAt(indice);
  
}
//Elimina una fila de la tabla Consultar
public anular(indice) {
  //luego eliminamos la fila
  // (<FormArray>this.listaCompleta).removeAt(indice);
  
}
//Manejo de cambio de autocompletado de tipo formulario
public cambioAutocompletadoTipoFormulario(elemento, indice) {
  // this.formulario.get('tipoFormulario').setValue(elemento);
  this.idTipoFormulario = elemento.id;
  console.log("id del tipo de formulario seleccionado: "+this.idTipoFormulario);
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('listaPrecio.id').setValue(this.idListaPrecio);
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('tipoFormulario.id').setValue(elemento.id);
  //obtenemos el precio de ListaPrecioVenta al tener los id (idListaPrecio, idTipoDeFormulario) necesarios para la consulta
  this.listaPrecioCompraService.obtenerPorListaPrecioYTipoFormulario(this.idListaPrecio, elemento.id).subscribe(response =>{
    (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').setValue(response.json().precio);
    console.log((<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').value);
  })
}
//Evento que calcula la "cantidad" como diferencia entre N° Hasta y N° Desde mas uno
public calcularCantidad(indice){
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').setValue(0);
  let calculoMontoTotal: number=0;
  let cantidad: number=0;
  cantidad=(<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('cantidad').value;
  calculoMontoTotal=cantidad*(<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').value;
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').setValue(calculoMontoTotal);
  this.montoPrecioFactura=this.montoPrecioFactura+calculoMontoTotal;
  this.formulario.get('monto').setValue(this.montoPrecioFactura);
  if(calculoMontoTotal!=0){
    (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('cantidad').disable();
    (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('autoTipoFormulario').disable();
  }
  
  //calcular la Numeracion
  this.formularioMostradorServices.listarNumeracionDesdeHasta(this.idTipoFormulario, cantidad).subscribe(response =>{
    let primerIndice=0;
    let segundoIndice=1;
    let mostrarNumeracion="";
    for(let i=0; i<response.json().length; i++){
      while(response.json()[segundoIndice]!= undefined){
        mostrarNumeracion=mostrarNumeracion+response.json()[primerIndice]+"->"+response.json()[segundoIndice]+ ", ";
        primerIndice+=2;
        segundoIndice+=2;
      }
    }
    (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('numeracion').setValue(mostrarNumeracion);
    console.log(mostrarNumeracion);
  })
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
  console.log(this.formulario.value)
}
//Aplica un descuento segun lo que abona el cliente (solo cuando la modalidad de pago es cuentaCorriente)
public aplicarAbona(){
  this.formulario.get('monto').setValue(this.formulario.get('monto').value-this.formulario.get('pago').value);
}
//Agrega un registro 
public agregar(){
  //pregunto si el campo IncreDesc es nulo o no, porque no se realizará el agregar registro si dicho campo es nulo
  //si es nulo le seteo como valor 0
  // if(this.formulario.get('increDesc').value==null){
  //   this.formulario.get('increDesc').setValue(0);
  // }
  console.log(this.formulario.value);
  // this.facturaVentaService.agregar(this.formulario.value).subscribe(
  //   res => {
  //     var respuesta = res.json();
  //     if(respuesta.codigo == 201) {
  //       this.reestablecerFormulario(respuesta.id);
  //       this.formulario.reset();
  //       setTimeout(function() {
  //         document.getElementById('idFecha').focus();
  //       }, 20);
  //       this.toastr.success(respuesta.mensaje);
  //     }
  //   },
  //   err => {
  //     var respuesta = err.json();
  //     if(respuesta.codigo == 11002) {
  //       document.getElementById("idFecha").focus();
  //       this.toastr.error(respuesta.mensaje);
  //     }
  //   }
  // );
  this.openDialogPdf(this.formulario.value, this.infoClientePropio);
}
//buscar Factura Compra de la pestaña consultar
public buscar(){
  let objeto={};
  if(this.idClienteConsultar.value==""){
    this.formularioConsulta.get('cliente').setValue(null);
  }else{
    // objeto.cliente.id=this.idClienteConsultar.value.id;
    this.formularioConsulta.get('clientePropio').setValue(this.idClienteConsultar.value);
  }
  console.log(this.idClienteConsultar.value);
  if(this.idModalidadPagoConsultar.value==""){
    this.formularioConsulta.get('modalidadPago').setValue(null);
  }else{
    this.formularioConsulta.get('modalidadPago').setValue(this.idModalidadPagoConsultar.value);
  }
  console.log(this.formularioConsulta.value);
  this.facturaVentaService.listarPorFiltros(this.formularioConsulta.value).subscribe(res =>{
    this.listaCompleta= res.json();
    console.log(res.json());
  });
}
//Reestablece los campos formularios
private reestablecerFormulario(id) {
  this.formulario.reset();
  // this.formulario.get('id').setValue(id);
  this.autocompletado.setValue(undefined);
  this.resultados = [];
  }

//declaramos los metodos para utilizar el Modal/Dialog "ventana-pdf.html"
public openDialogPdf(formulario, clientePropio): void {
  const dialogRef = this.dialog.open(PdfModal, {
    width: '950px',
    height: '600px',
    //le paso la lista completa de ventas para generar la tabla en el modal del pdf
    data: {listaCompleta: formulario, infoCliente: clientePropio}
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}

@Component({
  selector: 'factura-venta-modal',
  templateUrl: 'factura-venta-modal.html',
})
export class FacturasVentaModal{
  //Define la lista completa de registros
  public listaCompletaDeFormulariosVenta:FormArray ;
  constructor(public dialogRef: MatDialogRef<FacturasVentaModal>, @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit() {
    this.listaCompletaDeFormulariosVenta=this.data.formularios;
    console.log(this.listaCompletaDeFormulariosVenta);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
//modal imprimir PDF
@Component({
  selector: 'pdf-modal',
  templateUrl: 'pdf-modal.html',
})
export class PdfModal{
  //Define la lista completa de los datos enviados en "nueva venta" 
  public formularioEnviado;
  //Define la lista completa de las filas de formularios 
  public formulariosFila: Array<any>=[] ;
  //Define la fecha actual
  public fechaActual: string;
  //Define el atributo Modalidad de pago a mostrar
  public modalidadPago;
  //Define el form control para guardar los datos completos del cliente propio
  public infoClientePropio:FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<PdfModal>, @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit() {
    //obtenemos la fecha actual
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var mes="";
    if(mm=1)
     mes= "Enero";
    if(mm=1)
     mes= "Febrero";
    if(mm=1)
     mes= "Marzo";
    if(mm=1)
     mes= "Abril";
    if(mm=1)
     mes= "Mayo";
    if(mm=1)
     mes= "Junio";
    if(mm=1)
     mes= "Julio";
    if(mm=1)
     mes= "Agosto";
    if(mm=1)
     mes= "Septiembre";
    if(mm=1)
     mes= "Octubre";
    if(mm=1)
     mes= "Noviembre";
    if(mm=1)
     mes= "Diciembre";

    var yyyy = today.getFullYear();
    var hoy = dd + " de " + mes + " del " + yyyy;

    this.fechaActual= hoy;
    this.formularioEnviado=this.data.listaCompleta;
    this.modalidadPago= this.formularioEnviado.modalidadPago.id;
    let idModalidadPago= this.formularioEnviado.modalidadPago.id;
    this.formulariosFila= this.formularioEnviado.formulariosVenta;
    console.log(this.modalidadPago);
    console.log(this.formulariosFila.length);
    for(let i=0; i< this.formulariosFila.length; i++){
      this.formulariosFila[i].modalidadPago=idModalidadPago.value;
    }
    this.infoClientePropio= this.data.infoCliente;
    console.log(this.formularioEnviado);
    
    // console.log(this.listaCompletaDeFormularios);
    // let sumaTotal=0;
    // for(let i=0; i< this.listaCompletaDeFormularios.length; i++){
    //   sumaTotal= sumaTotal+ this.listaCompletaDeFormularios[i].montoTotal;
    // }
    // this.importeTotal= sumaTotal;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public imprimirPdf(){
    window.print();
  }
}

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
  //Define el form control para guardar los datos completos del cliente propio y del cliente eventual
  public infoClientePropio:FormControl = new FormControl();
  public infoClienteEventual:FormControl = new FormControl();
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
  //Define el id de la modalidad de pago seleccionada (si es CuentaCorriente el id=5 y mostrará el input "Abona($)", sino lo oculta)
  public modalidadPago:boolean = false;
  //Define el atributo Modalidad de pago para guardar el nombre de la modalidad elegida y pasarla a la ventana modal que se abre al agregar registro
  public nombreModalidadPago;
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
  //VARIABLES PARA EL CLIENTE EVENTUAL
  //Define el form control para el nombre del cliente eventual
  public nombre:FormControl = new FormControl();
  //Define el form control para el dni del cliente eventual
  public dni:FormControl = new FormControl();
  //Define el form control para el domicilio del cliente eventual
  public domicilio:FormControl = new FormControl();
  //Define el form control para el telefono del cliente eventual
  public telefono:FormControl = new FormControl();
  //VARIABLES PARA EL CLIENTE PROPIO  
  //Define el form control para las busquedas de Clientes
  public idCliente:FormControl = new FormControl();
  //Define el form control para las busquedas de Clientes en la pestaña Consultar
  public idClienteConsultar:FormControl = new FormControl();
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(public dialog: MatDialog, private formularioMostradorServices: FormularioMostradorService, private clienteService: ClientePropioService, private listaPrecioService: ListaPrecioService, private listaPrecioVentaService: ListaPrecioVentaService, private formBuilder: FormBuilder, private toastr: ToastrService, private facturaCompraService: FacturaCompraService, private facturaVentaService: FacturaVentaService, private listaPrecioCompraService: ListaPrecioCompraService, private tiposFormularios: TipoFormularioService, private modalidadPagoService: ModalidadPagoService, private proveedorService: ProveedorService) {
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
      numeroA: new FormControl('', Validators.required),
      numeroB: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      increDesc: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      pago: new FormControl(),
      modalidadPago: new FormControl('', Validators.required),
      clientePropio: new FormControl(),
      clienteEventual: this.formBuilder.group({
        nombre: '',
        dni: '',
        direccion: '',
        telefono: ''
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
    this.formulario.get('clientePropio').valueChanges
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
    this.formulario.get('modalidadPago').valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.modalidadPagoService.listarPorAlias(data).subscribe(response =>{
            console.log(this.formulario.get('clientePropio').value);
            if(this.formulario.get('clientePropio').value==null){
              this.resultadosModalidadPago=[];
              this.resultadosModalidadPago = response.json();
              if(this.resultadosModalidadPago[0].id==1){ //si el id=1 significa que es Cuenta Corriente, lo escondo
                this.resultadosModalidadPago.splice(0,1);
              }
              console.log("cli prop es nulo");
              console.log(response.json());
            }else{
              this.resultadosModalidadPago=[];
              this.resultadosModalidadPago = response.json();
              console.log("cli prop no es nulo");
              console.log(this.resultadosModalidadPago);
            }
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
    numeracionDesde: '',
    numeracionHasta: '',
    cantidad: new FormControl('', Validators.required),
    montoTotal: new FormControl('', Validators.required),
    tipoFormulario: this.formBuilder.group({
      id: new FormControl('', Validators.required)
    }),
    listaPrecio: this.formBuilder.group({
      id: new FormControl('', Validators.required)
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
}
//Establece el valor del titulo en el campo "Incremento/Descuento ($)"
public cambioIncrementoDescuento(elemento){
  this.formulario.get('monto').setValue(this.montoPrecioFactura);// reestablezco el monto si el usuario cambia la modalidad de pago
  this.formulario.get('increDesc').setValue(0);// y elimino el descuento o incremento que habia cargado anteriormente
  this.tipoModalidadPago="";
  if(elemento.tipo==0){
    this.tipoModalidadPago= "Descuento";
  }
  else{
    this.tipoModalidadPago= "Incremento";
  }
  console.log(elemento);
  if(elemento.id==1){
    this.modalidadPago= true; //si es cuenta corriente muestro el input "Abona ($)". El Id de CuentaCorriente esta seteado en 1
  }
  else{
    this.modalidadPago= false;
  }
  this.nombreModalidadPago=elemento.nombre;
  console.log(this.nombreModalidadPago);
}
//Establece los inputs segund el tipo de cliente
public mostrarInputTipoCliente(){
  this.formulario.get('modalidadPago').reset();
  this.formulario.get('formulariosVenta').reset();
  this.formulario.get('monto').reset();
  this.formulario.get('pago').reset();
  this.montoPrecioFactura=0;
  console.log(this.formulario);
  if(this.tipoCliente.value==0){
    this.inputClientePropio= true;
    this.inputsClienteEventual= false;
    this.formulario.get('clienteEventual.nombre').setValue(null);
    this.formulario.get('clienteEventual.dni').setValue(null);
    this.formulario.get('clienteEventual.direccion').setValue(null);
    this.formulario.get('clienteEventual.telefono').setValue(null);
    this.infoClienteEventual=null;
  }
  else{
    this.inputClientePropio= false;
    this.inputsClienteEventual= true;
    this.formulario.get('clienteEventual.nombre').setValue(null);
    this.formulario.get('clienteEventual.dni').setValue(null);
    this.formulario.get('clienteEventual.direccion').setValue(null);
    this.formulario.get('clienteEventual.telefono').setValue(null);
    this.formulario.get('clientePropio').setValue(null);
    this.formulario.get('pago').setValue(0);
    this.infoClientePropio=null;
  }
}
// Establece los atributos del clienteEventual
public cargarDatosCliEventual(){
  this.formulario.get('clienteEventual.nombre').setValue(this.nombre.value);
  this.formulario.get('clienteEventual.dni').setValue(this.dni.value);
  this.formulario.get('clienteEventual.direccion').setValue(this.domicilio.value);
  this.formulario.get('clienteEventual.telefono').setValue(this.telefono.value);
  this.infoClienteEventual= this.formulario.get('clienteEventual').value;
}
//Establece el valor del id del Cliente propio seleccionado 
public cambioAutocompletadoClientePropio(idCliente, cliente){
  this.infoClientePropio= cliente;
}
//Establece el valor del id de la Lista de Precio seleccionada
public cambioAutocompletadoListaPrecio(idListaPrecio){
  this.idListaPrecio= idListaPrecio;
  console.log(this.idListaPrecio);
}
//Agrega una fila a la segunda tabla
public agregarElemento() {
  this.listaAgregar = this.formulario.get('formulariosVenta') as FormArray;
  this.listaAgregar.push(this.crearformulariosVenta());
}
//Elimina una fila de la  tabla
public eliminarElemento(indice) {
  //restar el montoTotal de la fila que se elimina 
  let calculoMontoTotal=(<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').value;
  this.formulario.get('monto').setValue(this.formulario.get('monto').value-calculoMontoTotal);
  //luego eliminamos la fila
  (<FormArray>this.formulario.get('formulariosVenta')).removeAt(indice);
}
//Manejo de cambio de autocompletado de tipo formulario
public cambioAutocompletadoTipoFormulario(elemento, indice) {
  console.log(elemento);
  this.idTipoFormulario = elemento.id;
  console.log("id del tipo de formulario seleccionado: "+this.idTipoFormulario);
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('listaPrecio.id').setValue(this.idListaPrecio);
  (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('tipoFormulario.id').setValue(elemento.id);
  //obtenemos el precio de ListaPrecioVenta al tener los id (idListaPrecio, idTipoDeFormulario) necesarios para la consulta
  this.listaPrecioVentaService.obtenerPorListaPrecioYTipoFormulario(this.idListaPrecio, elemento.id).subscribe(response =>{
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
  //calcular la Numeracion
  this.formularioMostradorServices.listarNumeracionDesdeHasta(this.idTipoFormulario, cantidad).subscribe(response =>{
    try{
      let respuesta= response.json();
      let primerIndice=0;
      let segundoIndice=1;
      let mostrarNumeracion="";
      (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('numeracionDesde').setValue(response.json()[0]);
      let ultimaNumeracion= response.json().length;
      (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('numeracionHasta').setValue(response.json()[ultimaNumeracion-1]);
      for(let i=0; i<response.json().length; i++){
        while(response.json()[segundoIndice]!= undefined){
          mostrarNumeracion=mostrarNumeracion+response.json()[primerIndice]+"->"+response.json()[segundoIndice]+ ", ";
          primerIndice+=2;
          segundoIndice+=2;
        }
      }
      (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('numeracion').setValue(mostrarNumeracion);
      console.log(mostrarNumeracion);
      // Sumamos los montos
      calculoMontoTotal=cantidad*(<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').value;
      (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').setValue(calculoMontoTotal);
      this.montoPrecioFactura=this.montoPrecioFactura+calculoMontoTotal;
      this.formulario.get('monto').setValue(this.montoPrecioFactura); //solo si no entra al error, sumar el montoTotal al monto (Precio Factura $)
      if(calculoMontoTotal!=0){
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('cantidad').disable();
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('autoTipoFormulario').disable();
      }
      }catch(e){
        this.toastr.error("No existe este tipo de Formulario Venta");
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('listaPrecio.id').setValue(null);
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('tipoFormulario.id').setValue("");
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').setValue("");
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('cantidad').enable();
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('cantidad').setValue(0);
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('precioUnitario').setValue(0);
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('montoTotal').setValue(0);
        (<FormArray>this.formulario.get('formulariosVenta')).at(indice).get('autoTipoFormulario').enable();
      }
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
//Agrega un registro 
public agregar(){
  //si formulariosVenta no esta vacio, se pasa al metodo agregar
  if((<FormArray>this.formulario.get('formulariosVenta')).length!=0){
    //pregunto si el campo IncreDesc es nulo o no, porque no se realizará el agregar registro si dicho campo es nulo
    //si es nulo le seteo como valor 0
  if(this.formulario.get('increDesc').value==null){
    this.formulario.get('increDesc').setValue(0);
  }
  console.log(this.formulario.value);
  this.facturaVentaService.agregar(this.formulario.value).subscribe(
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
  this.openDialogPdf(this.formulario.value, this.infoClientePropio, this.infoClienteEventual, this.nombreModalidadPago);
  }
  else{
    this.toastr.error("Debe agregar al menos un formulario de venta");
  } 
}
//buscar Factura Compra de la pestaña consultar
public buscar(){
  let objeto={};
  if(this.idClienteConsultar.value==""){
    this.formularioConsulta.get('cliente').setValue(null);
  }else{
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
  this.autocompletado.setValue(undefined);
  this.resultados = [];
  }
//declaramos los metodos para utilizar el Modal/Dialog "ventana-pdf.html"
public openDialogPdf(formulario, clientePropio, clienteEventual, nombreModalidadPago): void {
  const dialogRef = this.dialog.open(PdfModal, {
    width: '950px',
    height: '600px',
    //le paso la lista completa de ventas para generar la tabla en el modal del pdf
    data: {listaCompleta: formulario, infoCliente: clientePropio, infoClienteEv: clienteEventual, modalidad: nombreModalidadPago}
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
  public idModalidadPago;
  //Define el form control para guardar los datos completos del cliente propio
  public infoClientePropio:FormControl = new FormControl();
  //Define el form control para guardar los datos completos del cliente eventual
  public infoClienteEventual:FormControl = new FormControl();
  //Define si la fila mostrarSaldoCuentaCorriente se muestra o no
  public mostrarSaldoCuentaCorriente:boolean = false;
  //Define si la fila con los datos del Cliente Propio se muestra o no
  public existeClientePropio:boolean = false;
  //Define si la fila con los datos del Eventual Propio se muestra o no
  public existeClienteEventual:boolean = false;
  //Define el atributo resultados NumerosALetras
  public resultNumerosALetras;
  // Define el string que contiene el resultado de convertir Numeros a letras
  public montoTotalEnLetra;
  constructor(public dialogRef: MatDialogRef<PdfModal>, @Inject(MAT_DIALOG_DATA) public data) {
    this.resultNumerosALetras = (function () {
      function Unidades(num) {
      switch (num)
      {
      case 1:
      return 'UN';
      case 2:
      return 'DOS';
      case 3:
      return 'TRES';
      case 4:
      return 'CUATRO';
      case 5:
      return 'CINCO';
      case 6:
      return 'SEIS';
      case 7:
      return 'SIETE';
      case 8:
      return 'OCHO';
      case 9:
      return 'NUEVE';
      }
      return '';
      }//Unidades()
      function Decenas(num) {
      let decena = Math.floor(num / 10);
      let unidad = num - (decena * 10);
      switch (decena)
      {
      case 1:
      switch (unidad)
      {
      case 0:
      return 'DIEZ';
      case 1:
      return 'ONCE';
      case 2:
      return 'DOCE';
      case 3:
      return 'TRECE';
      case 4:
      return 'CATORCE';
      case 5:
      return 'QUINCE';
      default:
      return 'DIECI' + Unidades(unidad);
      }
      case 2:
      switch (unidad)
      {
      case 0:
      return 'VEINTE';
      default:
      return 'VEINTI' + Unidades(unidad);
      }
      case 3:
      return DecenasY('TREINTA', unidad);
      case 4:
      return DecenasY('CUARENTA', unidad);
      case 5:
      return DecenasY('CINCUENTA', unidad);
      case 6:
      return DecenasY('SESENTA', unidad);
      case 7:
      return DecenasY('SETENTA', unidad);
      case 8:
      return DecenasY('OCHENTA', unidad);
      case 9:
      return DecenasY('NOVENTA', unidad);
      case 0:
      return Unidades(unidad);
      }
      }//Unidades()
      function DecenasY(strSin, numUnidades) {
      if (numUnidades > 0)
      return strSin + ' Y ' + Unidades(numUnidades)
      return strSin;
      }//DecenasY()
      function Centenas(num) {
      let centenas = Math.floor(num / 100);
      let decenas = num - (centenas * 100);
      switch (centenas)
      {
      case 1:
      if (decenas > 0)
      return 'CIENTO ' + Decenas(decenas);
      return 'CIEN';
      case 2:
      return 'DOSCIENTOS ' + Decenas(decenas);
      case 3:
      return 'TRESCIENTOS ' + Decenas(decenas);
      case 4:
      return 'CUATROCIENTOS ' + Decenas(decenas);
      case 5:
      return 'QUINIENTOS ' + Decenas(decenas);
      case 6:
      return 'SEISCIENTOS ' + Decenas(decenas);
      case 7:
      return 'SETECIENTOS ' + Decenas(decenas);
      case 8:
      return 'OCHOCIENTOS ' + Decenas(decenas);
      case 9:
      return 'NOVECIENTOS ' + Decenas(decenas);
      }
      return Decenas(decenas);
      }//Centenas()
      function Seccion(num, divisor, strSingular, strPlural) {
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
      let letras = '';
      if (cientos > 0)
      if (cientos > 1)
      letras = Centenas(cientos) + ' ' + strPlural;
      else
      letras = strSingular;
      if (resto > 0)
      letras += '';
      return letras;
      }//Seccion()
      function Miles(num) {
      let divisor = 1000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
      let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
      let strCentenas = Centenas(resto);
      
      if (strMiles == '')
      return strCentenas;
      return strMiles + ' ' + strCentenas;
      }//Miles()
      function Millones(num) {
      let divisor = 1000000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
      let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
      let strMiles = Miles(resto);
      
      if (strMillones == '')
      return strMiles;
      return strMillones + ' ' + strMiles;
      }//Millones()
      return function NumeroALetras(num, currency) {
      currency = currency || {};
      let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      letrasMonedaPlural: currency.plural || '', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: currency.singular || '', //'PESO', 'Dólar', 'Bolivar', 'etc'
      letrasMonedaCentavoPlural: currency.centPlural || '',
      letrasMonedaCentavoSingular: currency.centSingular || ''
      };
      if (data.centavos > 0) {
      data.letrasCentavos = 'CON ' + (function () {
      if (data.centavos == 1)
      return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
      else
      return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
      })();
      };
      if (data.enteros == 0)
      return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      if (data.enteros == 1)
      return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
      else
      return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      };
      })();
  }
  ngOnInit() {
    //obtenemos la fecha actual
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Enero es 0!
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
    this.idModalidadPago= this.formularioEnviado.modalidadPago.id;//carga el id de la modalidad de pago elegida
    let modalidadPago= this.data.modalidad;//carga todos los datos de la modlaidad de pago elegida
    if(modalidadPago=="CuentaCorriente"){
      this.mostrarSaldoCuentaCorriente=true;
    } else{
      this.mostrarSaldoCuentaCorriente=false;
    }
    this.formulariosFila= this.formularioEnviado.formulariosVenta;
    console.log(this.idModalidadPago);
    console.log(this.formulariosFila.length);
    for(let i=0; i< this.formulariosFila.length; i++){
      this.formulariosFila[i].modalidadPago=modalidadPago; //creo el atributo "modalidadPago" 
    }
    this.infoClientePropio= this.data.infoCliente;//carga todos los datos del cliente propio
    this.infoClienteEventual= this.data.infoClienteEv;
    if(this.data.infoCliente==null){ //si el id cliente propio es nulo
      this.existeClientePropio=false;
      this.existeClienteEventual=true;
    }
    else{
      this.existeClientePropio=true;
      this.existeClienteEventual=false;
    }
    this.montoTotalEnLetra=this.resultNumerosALetras(this.formularioEnviado.monto).toLowerCase();
  }
  //Cierra la ventana modal
  onNoClick(): void {
    this.dialogRef.close();
  }
  // Imprime el modal como un PDF
  public imprimirPdf(){
    var printContent = document.getElementById("pdf");
    var windowUrl = 'about:blank';
    var uniqueName = new Date();
    var windowName = 'Print' + uniqueName.getTime();
    var printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    this.dialogRef.close();
  }
  public imprimir(){
    document.getElementById('botonImprimir').style.display = "none";
    // document.getElementById('pdf').style.position = "relative";
    // document.getElementById('pdf').style.top = "-100px";
    window.print();
    window.close();
    this.dialogRef.close();
  }
}

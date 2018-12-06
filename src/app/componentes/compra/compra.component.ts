import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {
  // define el formulario
  public formulario: FormGroup;
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
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private formBuilder: FormBuilder, private listaPrecioCompraService: ListaPrecioCompraService, private tiposFormularios: TipoFormularioService, private modalidadPagoService: ModalidadPagoService, private proveedorService: ProveedorService) {
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
    var dateDay = new Date().toISOString().substring(0,10);
    // var dd = dateDay.getDate();
    // var MM = dateDay.getMonth() + 1; //January is 0!
    // var yyyy = dateDay.getFullYear();
    // var today = yyyy + '-' + MM + '-' + dd;
    
    console.log(dateDay);
    //Define los campos para validaciones
    this.formulario = this.formBuilder.group({
      numero: new FormControl(),
      fecha: new FormControl(),
      incrementoDescuento: new FormControl(),
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

    this.formulario.get('fecha').setValue(dateDay);
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
  console.log("id lista porecio del proveedor "+this.idListaPrecio);
  console.log(this.formulario.get('proveedor.id').value);
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
  console.log(this.formulario.get('modalidadPago.id').value);
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
public cambioAutocompletadoTipoFormulario(elemento, indice) {
  this.formulario.get('tipoFormulario').setValue(elemento);
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('tipoFormulario.id').setValue(elemento.id);
  //obtenemos el precio de ListaPrecioCompra al tener los id (idListaPrecio, idTipoDeFormulario) necesarios para la consulta
  this.listaPrecioCompraService.obtenerPorListaPrecioYTipoFormulario(this.idListaPrecio, elemento.id).subscribe(response =>{
    (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('precioUnitario').setValue(response.json().precio);
    console.log((<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('precioUnitario').value);
    // this.precioUnitario.setValue(response.json().precio);
  })
}
//Evento que calcula la "cantidad" como diferencia entre N° Hasta y N° Desde mas uno
public calcularCantidad(indice){
  console.log(this.formulario.value);
  let calculoCantidad: number= (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('numeracionHasta').value-(<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('numeracionDesde').value+1;
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('cantidad').setValue(calculoCantidad);
  let calculoMontoTotal=calculoCantidad*(<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('precioUnitario').value;
  (<FormArray>this.formulario.get('formulariosCompra')).at(indice).get('montoTotal').setValue(calculoMontoTotal);
  this.montoPrecioFactura=this.montoPrecioFactura+calculoMontoTotal;
  this.formulario.get('monto').setValue(this.montoPrecioFactura);
  console.log(this.montoPrecioFactura);
  console.log(this.formulario.value);
}
//Aplica descuento o incremento dependiendo el tipo de modalidad de Pago seleccionado
public aplicarDescuentoIncremento(){
  this.formulario.get('monto').setValue(this.montoPrecioFactura);
  if(this.tipoModalidadPago== "Descuento"){
    this.formulario.get('monto').setValue(this.formulario.get('monto').value-this.formulario.get('incrementoDescuento').value);
  }
  else{
    this.formulario.get('monto').setValue(this.formulario.get('monto').value+this.formulario.get('incrementoDescuento').value);
  }
  console.log(this.formulario.value)
}
//Agrega un registro 
// private agregar(){
//   console.log(this.listaAgregar);
//   this.agregarLista(this.listaAgregar).subscribe(
//     res => {
//       var respuesta = res.json();
//       if(respuesta.codigo == 201) {
//         this.reestablecerFormulario(respuesta.id);
//         this.formulario.reset();
//         setTimeout(function() {
//           document.getElementById('idAutocompletado').focus();
//         }, 20);
//         this.toastr.success(respuesta.mensaje);
//         this.limpiarArray();
//       }
//     },
//     err => {
//       var respuesta = err.json();
//       if(respuesta.codigo == 11002) {
//         document.getElementById("idPrecio").classList.add('is-invalid');
//         document.getElementById("idPrecio").focus();
//         this.toastr.error(respuesta.mensaje);
//       }
//     }
//   );
// }
}

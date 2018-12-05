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

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {
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
  // define al input fechaActual como un formControl
  public fechaActual: FormControl=new FormControl();
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
  public listaPrecioDisable:boolean = true;
  
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

  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosModalidadPago = [];
  //Define la lista de resultados de busqueda para Modalidad de Pago
  public resultadosProveedor = [];

  //Define el form control para las busquedas de Modalidad de Pagos
  public idModalidadPago:FormControl = new FormControl();
  //Define el form control para las busquedas de Proveedores
  public idProveedor:FormControl = new FormControl();
  //Define el form control para las busquedas de Proveedores
  public tipoFactura:FormControl = new FormControl();
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private formBuilder: FormBuilder, private modalidadPagoService: ModalidadPagoService, private proveedorService: ProveedorService) {
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
      numeroFactura: new FormControl(),
      proveedor: new FormControl(),
      fechaActual: new FormControl(),
      incrementoDescuento: new FormControl(),
      precioFactura: new FormControl()
    });
    this.formulario.get('fechaActual').setValue(dateDay);
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
public cambioAutocompletado(elemento) {
  this.tipoFactura.setValue(elemento.tipoFactura.nombre);
  this.formulario.patchValue(elemento);
  console.log(elemento.tipoFactura.nombre);
}
  

}

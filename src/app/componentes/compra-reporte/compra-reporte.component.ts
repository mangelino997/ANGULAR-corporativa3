import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { StockFormularioService } from 'src/app/servicios/stock-formulario.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { TipoFormularioService } from 'src/app/servicios/tipo-formulario.service';
import { TipoFormulario } from 'src/app/modelos/tipoFormulario';
import { FacturaCompraService } from 'src/app/servicios/factura-compra.service';

@Component({
  selector: 'app-compra-reporte',
  templateUrl: './compra-reporte.component.html',
  styleUrls: ['./compra-reporte.component.scss']
})
export class CompraReporteComponent implements OnInit {
  // define el formulario de la pestaña "Transferencia de Almacen a Mostrador"
  public formulario: FormGroup;
  //Define la lista completa de Proveedores
  public listaProveedores = [];
  //Define la lista completa de Tipos de Formularios
  public listaTiposFormularios = [];
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  //Define si el input buscarPorFecha se muestra 
  public mostrarFecha:boolean = false;
  //Define si el input buscarProveedor se muestra 
  public mostrarProveedor:boolean = false;
  //Define si el input buscar por TipoFormulario se muestra 
  public mostrarTipoFormulario:boolean = false;
  //Define si el input Tipo Fecha se muestra 
  public mostrarTipoFecha:boolean = false;
  //Define si los inputs Tipo Mes y Año se muestran
  public mostrarTipoMesAnio:boolean = false;
  //Define si los inputs Tipo desde y hasta se muestran
  public mostrarTipoPeriodo:boolean = false;

  //Define el form control para las busquedas de Proveedores
  public buscarProveedor:FormControl = new FormControl();
  //Define el form control para las busquedas de Tipos de Formularios
  public buscarTipoFormulario:FormControl = new FormControl();
  
  

  constructor(private facturaCompraService: FacturaCompraService, private proveedorService: ProveedorService, private tiposForulariosService: TipoFormularioService, private formBuilder: FormBuilder) {
    //Autocompletado - Buscar por proveedor
    this.buscarProveedor.valueChanges
      .subscribe(data => {
        if(typeof data == 'string') {
          this.proveedorService.listarPorAlias(data).subscribe(response =>{
            this.listaProveedores = response.json();
            console.log(response.json());
          })
        }
    });
    //Autocompletado - Buscar por Tipo de formulario
    this.buscarTipoFormulario.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.tiposForulariosService.listarPorNombre(data).subscribe(response =>{
          this.listaTiposFormularios = response.json();
          console.log(response.json());
        })
      }
    });

    //Controla cantidad de valores en el campo anio
//     var inputQuantity = [];
//     $(function() {
//       $(".quantity").each(function(i) {
//         inputQuantity[i]=this.defaultValue;
//          $(this).data("idx",i); // save this field's index to access later
//       });
//       $(".quantity").on("keyup", function (e) {
//         var $field = $(this),
//             val=this.value,
//             $thisIndex=parseInt($field.data("idx"),10); // retrieve the index
// //        window.console && console.log($field.is(":invalid"));
//           //  $field.is(":invalid") is for Safari, it must be the last to not error in IE8
//         if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid") ) {
//             this.value = inputQuantity[$thisIndex];
//             return;
//         } 
//         if (val.length > Number($field.attr("maxlength"))) {
//           val=val.slice(0, 5);
//           $field.val(val);
//         }
//         inputQuantity[$thisIndex]=val;
//       });      
//     });
   }

  ngOnInit() {
    //obtenemos la fecha actual
    var dateDay = new Date().toISOString().substring(0,10);
    //Define el formulario y sus validaciones
    this.formulario = this.formBuilder.group({
      buscarPor: new FormControl(),
      fecha: new FormControl(),
      idProveedor: new FormControl(),
      idTipoFormulario: new FormControl(),
      tipo: new FormControl(),
      tipoFecha: new FormControl(),
      mes: new FormControl(),
      anio: new FormControl(),
      desde: new FormControl(),
      fechaInicio: new FormControl(),
      fechaFin: new FormControl(),
      montoTotal: new FormControl()
    });
  }

  // Cambia el valor boolean de los input segun lo seleccionado en Buscar Por
  public cambioBuscarPor(){
    
    if(this.formulario.get('buscarPor').value==0){
      this.mostrarFecha= true;
      this.mostrarProveedor= false;
      this.mostrarTipoFormulario= false;
      this.formulario.get('idProveedor').setValue(null);
      this.formulario.get('idTipoFormulario').setValue(null);
    }
    if(this.formulario.get('buscarPor').value==1){
      this.mostrarFecha= false;
      this.mostrarProveedor= true;
      this.mostrarTipoFormulario= false;
      this.formulario.get('fecha').setValue(null);
      this.formulario.get('idTipoFormulario').setValue(null);
    }
    if(this.formulario.get('buscarPor').value==2){
      this.mostrarFecha= false;
      this.mostrarProveedor= false;
      this.mostrarTipoFormulario= true;
      this.formulario.get('idProveedor').setValue(null);
      this.formulario.get('fecha').setValue(null);
    }
  }
  //Cambia el valor boolean de los input segun lo seleccionado en Tipo
  public cambioTipo(){
    if(this.formulario.get('tipo').value==0){
      this.mostrarTipoFecha= true;
      this.mostrarTipoMesAnio= false;
      this.mostrarTipoPeriodo= false;
    }
    if(this.formulario.get('tipo').value==1){
      this.mostrarTipoFecha= false;
      this.mostrarTipoMesAnio= true;
      this.mostrarTipoPeriodo= false;
    }
    if(this.formulario.get('tipo').value==2){
      this.mostrarTipoFecha= false;
      this.mostrarTipoMesAnio= false;
      this.mostrarTipoPeriodo= true;
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
  //asigna a tipoFormulario el valor del autocompletado
  public cambioAutocompletadoTipoFormulario(tipoDeFormulario){
    this.formulario.get('idTipoFormulario').setValue(tipoDeFormulario.id);
  }
  //asigna a proveedor el valor del autocompletado
  public cambioAutocompletadoProveedor(proveedor){
    this.formulario.get('idProveedor').setValue(proveedor.id);
  }
  // metodo buscar 
  public buscar(){
    this.listaCompleta=[];
    console.log(this.formulario.value);
    if (this.formulario.get('idProveedor').value!=null){
      console.log("buscar por prov");
      this.facturaCompraService.listarPorProveedor(this.formulario.value).subscribe(response =>{
        this.listaCompleta = response.json();
        console.log(response.json());
      });
    }
    if (this.formulario.get('idTipoFormulario').value!=null){
      console.log("buscar por tf");
      this.facturaCompraService.listarPortipoFormulario(this.formulario.value).subscribe(response =>{
        this.listaCompleta = response.json();
        console.log(response);
      });
    }
    if (this.formulario.get('fecha').value!=null){
      console.log("buscar por fecha");
      this.facturaCompraService.listarPorFecha(this.formulario.value).subscribe(response =>{
        this.listaCompleta = response.json();
        console.log(response.json);
      });
    }
  }
  
}

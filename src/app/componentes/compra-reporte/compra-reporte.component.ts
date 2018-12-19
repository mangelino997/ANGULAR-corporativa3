import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { StockFormularioService } from 'src/app/servicios/stock-formulario.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { TipoFormularioService } from 'src/app/servicios/tipo-formulario.service';
import { TipoFormulario } from 'src/app/modelos/tipoFormulario';
import { FacturaCompraService } from 'src/app/servicios/factura-compra.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  //Define si el input combo box "Tipo" se muestra (si busco por Fecha no se debe mostrar)
  public mostrarTipo:boolean = false;
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
  
  

  constructor(public dialog: MatDialog, private toastr: ToastrService, private facturaCompraService: FacturaCompraService, private proveedorService: ProveedorService, private tiposForulariosService: TipoFormularioService, private formBuilder: FormBuilder) {
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
      this.mostrarTipo= false;
      this.mostrarTipoFecha= true;
      this.mostrarProveedor= false;
      this.mostrarTipoFormulario= false;
      this.formulario.get('idProveedor').setValue(null);
      this.formulario.get('idTipoFormulario').setValue(null);
    }
    if(this.formulario.get('buscarPor').value==1){
      this.mostrarTipo= true;
      this.mostrarTipoFecha= false;
      this.mostrarProveedor= true;
      this.mostrarTipoFormulario= false;
      this.formulario.get('fecha').setValue(null);
      this.formulario.get('idTipoFormulario').setValue(null);
    }
    if(this.formulario.get('buscarPor').value==2){
      this.mostrarTipo= true;
      this.mostrarTipoFecha= false;
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
      this.formulario.get('mes').setValue(null);
      this.formulario.get('anio').setValue(null);
      this.mostrarTipoPeriodo= false;
      this.formulario.get('fechaInicio').setValue(null);
      this.formulario.get('fechaFin').setValue(null);
    }
    if(this.formulario.get('tipo').value==1){
      this.mostrarTipoFecha= false;
      this.formulario.get('fecha').setValue(null);
      this.mostrarTipoMesAnio= true;
      this.mostrarTipoPeriodo= false;
      this.formulario.get('fechaInicio').setValue(null);
      this.formulario.get('fechaFin').setValue(null);
    }
    if(this.formulario.get('tipo').value==2){
      this.mostrarTipoFecha= false;
      this.formulario.get('fecha').setValue(null);
      this.mostrarTipoMesAnio= false;
      this.formulario.get('mes').setValue(null);
      this.formulario.get('anio').setValue(null);
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
    let sumaTotal=0;
    this.listaCompleta=[];
    console.log(this.formulario.value);
    //buscar en el servicio de Proveedor
    if (this.formulario.get('idProveedor').value!=null){
      console.log("buscar por prov");
        this.facturaCompraService.listarPorProveedor(this.formulario.value).subscribe(response =>{
          this.listaCompleta = response.json();
          console.log(response.json());
          if(response.json().length==0){
            this.toastr.error("No se encontraron datos..");
            this.formulario.get('montoTotal').setValue(0);
          }
          else{
            for(let i=0; i< this.listaCompleta.length; i++ ){ //calculo el monto total sumando los montos de cada fila
              sumaTotal= sumaTotal+ this.listaCompleta[i].monto;
            }
            this.formulario.get('montoTotal').setValue(sumaTotal);
          }
        },
        err => {
          var respuesta = err.json();
          this.toastr.error(respuesta.mensaje);
        });
    }
    //Buscar en el servicio de Tipo Formulario
    if (this.formulario.get('idTipoFormulario').value!=null){
      console.log("buscar por tf");
      this.facturaCompraService.listarPortipoFormulario(this.formulario.value).subscribe(response =>{
        this.listaCompleta = response.json();
        console.log(response.json());
        if(response.json().length==0){
          this.toastr.error("No se encontraron datos..");
          this.formulario.get('montoTotal').setValue(0);
        }
        else{
          for(let i=0; i< this.listaCompleta.length; i++ ){ //calculo el monto total sumando los montos de cada fila
            sumaTotal= sumaTotal+ this.listaCompleta[i].monto;
          }
          this.formulario.get('montoTotal').setValue(sumaTotal);
        }
      },
        err => {
          var respuesta = err.json();
          this.toastr.error(respuesta.mensaje);
        });
    }
    //Buscar en el servicio de Fecha
    if (this.formulario.get('fecha').value!=null){
      console.log("buscar por fecha");
      this.facturaCompraService.listarPorFecha(this.formulario.get('fecha').value).subscribe(response =>{
        this.listaCompleta = response.json();
        if(response.json().length==0){
          this.toastr.error("No se encontraron datos..");
          this.formulario.get('montoTotal').setValue(0);
        }
        else{
          for(let i=0; i< this.listaCompleta.length; i++ ){ //calculo el monto total sumando los montos de cada fila
            sumaTotal= sumaTotal+ this.listaCompleta[i].monto;
          }
          this.formulario.get('montoTotal').setValue(sumaTotal);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 405) {
        this.toastr.error(respuesta.mensaje);}
      });
    }
  }
  //imprimir pantalla
  public imprimir(){
    window.print();
  }
  //declaramos los metodos para utilizar el Modal/Dialog
  public openDialog(formulariosFacturas, fechaVenta): void {
    const dialogRef = this.dialog.open(ReportesModal, {
      width: '950px',
      //los formularios que paso desde el html en cada ver son asignados a la variable formularios para que pueda leerlos desde la ventana factura-modal.html
      data: {formularios: formulariosFacturas,
              fecha: fechaVenta},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'reporte-modal',
  templateUrl: 'reporte-modal.html',
})
export class ReportesModal{
  //Define la lista completa de registros
  public listaCompletaDeFormularios:FormArray ;
  // Define la fecha 
  public fecha: "";
  //Define elñ improte Total
  public importeTotal: number=0;

  constructor(public dialogRef: MatDialogRef<ReportesModal>, @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit() {
    this.listaCompletaDeFormularios=this.data.formularios;
    this.fecha= this.data.fecha;
    console.log(this.listaCompletaDeFormularios);
    let sumaTotal=0;
    for(let i=0; i< this.listaCompletaDeFormularios.length; i++){
      sumaTotal= sumaTotal+ this.listaCompletaDeFormularios[i].montoTotal;
    }
    this.importeTotal= sumaTotal;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

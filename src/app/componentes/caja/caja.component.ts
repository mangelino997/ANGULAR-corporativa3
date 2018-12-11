import { Component, OnInit } from '@angular/core';
import { CajaService } from 'src/app/servicios/caja.service';
import { FormGroup } from '@angular/forms';
import { Caja } from 'src/app/modelos/caja';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {
  //Define el formulario
  public formulario:FormGroup;
  //Define el formulario para los billetes
  public formularioBillete:FormGroup;
  //Define el estado del boton calcular
  public estadoBtnCalcular:boolean = true;
  //Define el estado del boton guardar billetes
  public estadoBtnGuardarBilletes:boolean = true;
  //Define el estado del boton retiro
  public estadoBtnRetiro:boolean = true;
  //Define el estado del boton guardar
  public estadoBtnGuardar:boolean = true;
  //Constructor
  constructor(private cajaServicio: CajaService, private cajaModelo: Caja,
    private toastr: ToastrService) {}
  //Al iniciarse el componente
  ngOnInit() {
    //Establece el formulario
    this.formulario = this.cajaModelo.formulario;
    //Obtiene la caja del dia de la fecha
    this.cajaServicio.obtenerCajaDeHoy().subscribe(res => {
      let caja = res.json();
      /*
      * Si ya se cargaron billetes el dia de la fecha, calcula la cantidad e importe 
      * y deshabilita los botones calcular y guardar
      */
      if(caja.billetes != null) {
        this.formulario.patchValue(caja);
        this.calcularCantidadEImporte();
        this.estadoCampoBilletes();
        this.estadoBtnCalcular = false;
        this.estadoBtnGuardarBilletes = false;
        if(caja.montoRetiro != -1 && caja.montoRetiro != null) {
          this.formulario.get('montoRetiro').setValue(caja.montoRetiro.toFixed(2));
          this.formulario.get('montoRetiro').disable();
          this.estadoBtnRetiro = false;
        } else {
          let valor = 0;
          this.formulario.get('montoRetiro').setValue(valor.toFixed(2));
          setTimeout(function() {
            document.getElementById('idRetiro').focus();
          }, 20)
        }
      } else {
        setTimeout(function() {
          document.getElementById('idPesos2').focus();
        }, 20)
      }
    })
    //Establece valores por defecto
    this.establecerValoresPorDefecto();
  }
  //Establece los valores por defecto
  private establecerValoresPorDefecto() {
    let numero = 0;
    this.formulario.get('billetes').get('pesos2').setValue(numero);
    this.formulario.get('billetes').get('pesos5').setValue(numero);
    this.formulario.get('billetes').get('pesos10').setValue(numero);
    this.formulario.get('billetes').get('pesos20').setValue(numero);
    this.formulario.get('billetes').get('pesos50').setValue(numero);
    this.formulario.get('billetes').get('pesos100').setValue(numero);
    this.formulario.get('billetes').get('pesos200').setValue(numero);
    this.formulario.get('billetes').get('pesos500').setValue(numero);
    this.formulario.get('billetes').get('pesos1000').setValue(numero);
    this.formulario.get('billetes').get('cantidad').setValue(numero);
    this.formulario.get('billetes').get('importeTotal').setValue(numero);
  }
  //Calcula la cantidad e importe de billetes
  public calcularCantidadEImporte(): void {
    let cantidadBillete = 0;
    let cantidad = 0;
    let importe = 0;
    let listaBilletes = [2, 5, 10, 20, 50, 100, 200, 500, 1000];
    for(var i = 0 ; i < 9 ; i++) {
      cantidadBillete = this.formulario.get('billetes').get('pesos' + listaBilletes[i]).value;
      cantidad += cantidadBillete;
      importe += listaBilletes[i] * cantidadBillete;
    }
    this.formulario.get('billetes').get('cantidad').setValue(cantidad);
    this.formulario.get('billetes').get('importeTotal').setValue(importe.toFixed(2));
  }
  //Guarda los billetes con sus cantidades ingresadas, establece esta seccion en no editable
  public guardarBilletes(): void {
    console.log(this.formulario.value);
    this.cajaServicio.agregar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 201) {
          setTimeout(function() {
            document.getElementById('idRetiro').focus();
          }, 20);
          this.estadoCampoBilletes();
          this.estadoBtnCalcular = false;
          this.estadoBtnGuardarBilletes = false;
          this.formulario.get('id').setValue(respuesta.id-1);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        this.toastr.error(respuesta.mensaje);
      }
    )
  }
  //Establece el campo de los billetes en deshabilitado
  private estadoCampoBilletes() {
    this.formulario.get('billetes').get('pesos2').disable();
    this.formulario.get('billetes').get('pesos5').disable();
    this.formulario.get('billetes').get('pesos10').disable();
    this.formulario.get('billetes').get('pesos20').disable();
    this.formulario.get('billetes').get('pesos50').disable();
    this.formulario.get('billetes').get('pesos100').disable();
    this.formulario.get('billetes').get('pesos200').disable();
    this.formulario.get('billetes').get('pesos500').disable();
    this.formulario.get('billetes').get('pesos1000').disable();
    this.formulario.get('billetes').get('cantidad').disable();
    this.formulario.get('billetes').get('importeTotal').disable();
  }
  //Deshabilita el campo retiro
  public finalizarRetiro(): void {
    this.cajaServicio.actualizarRetiro(this.formulario.value).subscribe(
      res => {
        let respuesta = res.json();
        this.formulario.get('montoRetiro').disable();
        this.estadoBtnRetiro = false;
        this.toastr.success(respuesta.mensaje);
        this.obtenerMontos();
      },
      err => {
        let respuesta = err.json();
        this.toastr.error(respuesta.mensaje);
      }
    )
  }
  //Obtiene los montos del dia de la fecha
  private obtenerMontos(): void {
    this.cajaServicio.obtenerMontos().subscribe(
      res => {
        let importes = res.json();
        this.formulario.get('montoVenta').setValue((importes.montoVenta).toFixed(2));
        this.formulario.get('montoTransferencia').setValue((importes.montoTransferencia).toFixed(2));
        this.formulario.get('montoGasto').setValue((importes.montoGasto).toFixed(2));
        this.formulario.get('montoTotal').setValue((importes.montoTotal).toFixed(2));
        this.calcularImportesFinales();
      },
      err => {
        console.log(err);
      }
    )
  }
  //Calcula el sobrante o faltante y el importe final en caja
  private calcularImportesFinales(): void {
    let retiro = this.formulario.get('montoRetiro').value;
    let importeTotalBilletes = this.formulario.get('billetes').get('importeTotal').value;
    let importeTotal = this.formulario.get('montoTotal').value;
    let diferencia = importeTotal - importeTotalBilletes;
    let valor = 0;
    if(diferencia == 0) {
      this.formulario.get('sobrante').setValue(valor.toFixed(2));
      this.formulario.get('faltante').setValue(valor.toFixed(2));
    } else if(diferencia > 0) {
      this.formulario.get('sobrante').setValue(valor.toFixed(2));
      this.formulario.get('faltante').setValue(diferencia.toFixed(2));
    } else {
      this.formulario.get('sobrante').setValue(Math.abs(diferencia).toFixed(2));
      this.formulario.get('faltante').setValue(valor.toFixed(2));
    }
    this.formulario.get('importeFinalCaja').setValue((importeTotalBilletes-retiro).toFixed(2));
  }
  //Actualiza la caja del dia
  public actualizar(): void {
    this.formulario.get('montoRetiro').enable();
    this.cajaServicio.actualizar(this.formulario.value).subscribe(
      res => {
        let respuesta = res.json();
        this.estadoBtnGuardar = false;
        this.formulario.get('montoRetiro').disable();
        this.toastr.success(respuesta.mensaje);
      },
      err => {
        let respuesta = err.json();
        this.toastr.success(respuesta.mensaje);
      }
    )
  }
}

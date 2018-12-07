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
      if(caja.billetes != null) {
        this.formulario.patchValue(caja);
        this.calcularCantidadEImporte();
        this.estadoBtnCalcular = false;
        this.estadoBtnGuardarBilletes = false;
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
    this.cajaServicio.agregar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 201) {
          setTimeout(function() {
            document.getElementById('idRetiro').focus();
          }, 20);
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
          this.estadoBtnCalcular = false;
          this.estadoBtnGuardarBilletes = false;
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        this.toastr.error(respuesta.mensaje);
      }
    )
  }
  //Deshabilita el campo retiro
  public finalizarRetiro(): void {
    this.formulario.get('montoRetiro').disable();
    this.estadoBtnRetiro = false;
  }
}

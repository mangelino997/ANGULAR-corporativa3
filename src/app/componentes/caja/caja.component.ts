import { Component, OnInit } from '@angular/core';
import { CajaService } from 'src/app/servicios/caja.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Caja } from 'src/app/modelos/caja';

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
  //Constructor
  constructor(private cajaServicio: CajaService, private fb: FormBuilder) { 

  }
  //Al iniciarse el componente
  ngOnInit() {
    //Establece el formulario
    this.formulario = new FormGroup({
      id: new FormControl(),
      version: new FormControl(),
      fecha: new FormControl('', Validators.required),
      montoVenta: new FormControl('', Validators.required),
      montoTransferencia: new FormControl('', Validators.required),
      montoRetiro: new FormControl('', Validators.required),
      montoGasto: new FormControl('', Validators.required),
      montoTotal: new FormControl('', Validators.required),
      sobrante: new FormControl(),
      faltante: new FormControl(),
      importeFinalCaja: new FormControl('', Validators.required),
      cajaBilletes: new FormControl()
    })
    this.formularioBillete = new FormGroup({
      pesos2: new FormControl(),
      pesos5: new FormControl(),
      pesos10: new FormControl(),
      pesos20: new FormControl(),
      pesos50: new FormControl(),
      pesos100: new FormControl(),
      pesos200: new FormControl(),
      pesos500: new FormControl(),
      cantidad: new FormControl(),
      importeTotal: new FormControl()
    })
  }
}

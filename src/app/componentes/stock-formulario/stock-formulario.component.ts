import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { StockFormularioService } from 'src/app/servicios/stock-formulario.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-stock-formulario',
  templateUrl: './stock-formulario.component.html',
  styleUrls: ['./stock-formulario.component.scss']
})
export class StockFormularioComponent implements OnInit {
   // define el formulario de la pestaña "Transferencia de Almacen a Mostrador"
   public formulario: FormGroup;
   // define el formulario transferencia"
   public formulariosTransferencia: FormGroup;
   //Define la lista completa de registros
   public listaCompleta:Array<any> = [];
   //Define si la barra de profreso se muestra 
  public mostrarBarra:boolean = false;

  constructor(private formBuilder: FormBuilder, private stockFormularioServices: StockFormularioService) {
    
   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      tipo: new FormControl(),
      montoTotal: new FormControl()
    });
  }

  //metodo consultar los formularios segun el tipo
  public consultar(){
    this.mostrarBarra=true;
    this.listaCompleta=[];
    this.formulario.get('montoTotal').setValue(0);
    console.log(this.listaCompleta);

    if(this.formulario.get('tipo').value==0){
      this.stockFormularioServices.listarFormulariosAlmacenAgrupadosPorTipoFormulario().subscribe(res=>{
        let respuesta= res.json();
        this.listaCompleta= respuesta;
        let sumaTotal=0;
        for(let i=0; i< this.listaCompleta.length; i++ ){
          sumaTotal= sumaTotal+ this.listaCompleta[i].cantidad;
        }
        this.formulario.get('montoTotal').setValue(sumaTotal);
      })
    }
    else{
      this.stockFormularioServices.listarFormulariosMostradorAgrupadosPorTipoFormulario().subscribe(res=>{
        let respuesta= res.json();
        this.listaCompleta= respuesta;
        let sumaTotal=0;
        for(let i=0; i< this.listaCompleta.length; i++ ){
          sumaTotal= sumaTotal+ this.listaCompleta[i].cantidad;
        }
        this.formulario.get('montoTotal').setValue(sumaTotal);
      })
    }
  }
}

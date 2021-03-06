import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { StockFormularioService } from 'src/app/servicios/stock-formulario.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private formBuilder: FormBuilder, private stockFormularioServices: StockFormularioService, private toastr: ToastrService) {
    
   }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      tipo: new FormControl(),
      montoTotal: new FormControl(),
      numeracion: new FormControl()
    });
  }
  //metodo consultar los formularios segun el tipo
  public consultar(){
    this.mostrarBarra=true;
    this.listaCompleta=[];
    this.formulario.get('montoTotal').setValue(0);
    console.log(this.formulario.get('tipo').value);
    if(this.formulario.get('tipo').value==0){
      this.stockFormularioServices.listarFormulariosAlmacenAgrupadosPorTipoFormulario().subscribe(res=>{
        let respuesta= res.json();
        this.listaCompleta= respuesta;
        let sumaTotal=0;
        for(let i=0; i< this.listaCompleta.length; i++ ){
          sumaTotal= sumaTotal+ this.listaCompleta[i].monto; // sumo los montos de cada fila
          // cambiar el formato de la Numeracion a " -> ";
          let str = this.listaCompleta[i].numeracion; //obtengo lo que hay en numeracion
          let res = str.split("->");
          let primerI=0;
          let segundoI=1;
          let mostrarNumeracion="";
          for(let j=0; j<res.length; j++){
            while(res[segundoI]!= undefined){
              mostrarNumeracion= mostrarNumeracion + res[primerI]+"->"+res[segundoI]+";";
                primerI+=2;
                segundoI+=2;
            }
          }
          this.listaCompleta[i].numeracion=mostrarNumeracion; //seteo el nuevo formato en numeracion

        }
        this.formulario.get('montoTotal').setValue(sumaTotal);
      },
      err=>{
        this.mostrarBarra=false;
        this.toastr.error("No existen Formularios para Tipo Almacén.");
      });
    }
    if(this.formulario.get('tipo').value==1){
      this.mostrarBarra=true;

      this.stockFormularioServices.listarFormulariosMostradorAgrupadosPorTipoFormulario().subscribe(res=>{

        let respuesta= res.json();
        console.log(respuesta);
        if(respuesta.length!=0){
          this.listaCompleta= respuesta;
        let sumaTotal=0;
        for(let i=0; i< this.listaCompleta.length; i++ ){
          sumaTotal= sumaTotal+ this.listaCompleta[i].cantidad;
        }
        this.formulario.get('montoTotal').setValue(sumaTotal);
        }
        else{
          this.mostrarBarra=false;
          this.toastr.error("No existen Formularios para ese tipo de Mostrador.");
        }
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { Modulo } from 'src/app/modelos/modulo';
import { FormGroup, FormControl } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';



@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit {
  // define el formulario
  public formulario: FormGroup;
  // define una lista 
  public listado: Array<any>;
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();

  constructor(private moduloServicio: ModuloService, private modulo: Modulo, private subopcionPestaniaServicio: SubopcionPestaniaService) { }


  ngOnInit() {
    this.formulario= this.modulo.formulario;

    this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
      res => {
        this.pestanias= res.json();
        this.activeLink= this.pestanias[0].pestania.nombre;
        console.log(this.pestanias[0].pestania.nombre);

      }
    );



  }





  private obtenerSiguienteId(){
    this.moduloServicio.obtenerSiguienteId().subscribe(
      res => {
        this.formulario.get('id').setValue(res.json());
      }
    );
  }

  private listar(){
    this.moduloServicio.listar().subscribe(
      res => {
        this.listado=res.json();
      }
    );
  }

  private agregar(){
    this.moduloServicio.agregar(this.formulario.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  private actualizar(){
    this.moduloServicio.actualizar(this.formulario.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  private eliminar(){
    this.moduloServicio.agregar(this.formulario.get('id').value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


}

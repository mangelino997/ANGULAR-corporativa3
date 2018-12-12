import { Component, OnInit, Inject } from '@angular/core';
import { CuentaCorrienteService } from 'src/app/servicios/cuenta-corriente.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CuentaCorriente } from 'src/app/modelos/cuentaCorriente';
import { ClientePropioService } from 'src/app/servicios/cliente-propio.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.scss']
})
export class CuentaCorrienteComponent implements OnInit {
  //Define el formulario
  public formulario: FormGroup;
  //Define una lista de clientes
  public resultadosClientes: Array<any> = [];
  //Define la lista de clientes deudores
  public clientesDeudores: Array<any> = [];
  //Define el indice seleccionado para pestanias
  public indiceSeleccionado: number;
  //Define la pestania activia
  public pestaniaActiva: string;
  //Define la lista de deudores
  public deudores:Array<any> = [];
  //Define la lista de historial de cliente
  public listaHistorial:Array<any> = [];
  //Define la lista de pestanias
  private pestanias:Array<string> = ['Consultar', 'Deudores', 'Historial'];
  //Constructor
  constructor(private cuentaCorrienteServicio: CuentaCorrienteService, private cuentaCorrienteModelo: CuentaCorriente,
    private clientePropioServicio: ClientePropioService, public dialog: MatDialog, private toastr: ToastrService) {
  }
  ngOnInit() {
    //Establece el formulario
    this.formulario = this.cuentaCorrienteModelo.formulario;
    //Establece la pestania por defecto
    this.seleccionarPestania(1, 'Consultar');
    //Obtiene un cliente por alias
    this.formulario.get('clientePropio').valueChanges.subscribe(data => {
      if (typeof data == 'string') {
        this.clientePropioServicio.listarPorAlias(data).subscribe(res => {
          this.resultadosClientes = res.json();
        })
      }
    })
  }
  //Establece la pestania seleccionada
  public seleccionarPestania(indice, nombre): void {
    //Reestablece el formulario
    this.reestablecerFormulario();
    //Establece el indice seleccionado por defecto
    this.indiceSeleccionado = indice;
    //Establece la pestania activa
    this.pestaniaActiva = nombre;
    //Verifica que pestania es y llama a metedo correspondiente
    switch(indice) {
      case 1:
        //Establece el foco en cliente
        setTimeout(function () {
          document.getElementById('idCliente').focus();
        }, 20);
        break;
      case 2:
        this.listarDeudores();
        break;
      case 3:
        //Establece el foco en cliente
        setTimeout(function () {
          document.getElementById('idCliente').focus();
        }, 20);
        break;
    }
  }
  //Reestablece el formulario
  private reestablecerFormulario(): void {
    this.formulario.reset();
    this.clientesDeudores = [];
    this.listaHistorial = [];
  }
  //Obtiene la lista de deudas del cliente por fecha ascendente
  public listarPorClientePropioDeudor(): void {
    let idClientePropio = this.formulario.get('clientePropio').value.id;
    this.cuentaCorrienteServicio.listarPorClientePropioDeudor(idClientePropio).subscribe(res => {
      this.clientesDeudores = res.json();
    })
  }
  //Salda una deuda
  public saldar(): void {
    let elemento = {
      clientePropio: {
        id: this.formulario.get('clientePropio').value.id
      },
      deuda: this.formulario.get('importeASaldar').value
    }
    this.cuentaCorrienteServicio.saldar(elemento).subscribe(
      res => {
        console.log(res.json());
        let respuesta = res.json();
        if(respuesta.codigo == 200) {
          this.listarPorClientePropioDeudor();
          this.formulario.get('importeASaldar').setValue('');
          document.getElementById('idCliente').focus();
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        let respuesta = err.json();
        this.toastr.error(respuesta.mensaje);
      }
    )
  }
  //Obtiene la lista de deudores
  public listarDeudores(): void {
    this.cuentaCorrienteServicio.listarDeudaClientes().subscribe(res => {
      this.deudores = res.json();
    })
  }
  //Cambia de pestania y muestra la ficha del cliente
  public verFicha(elemento): void {
    this.seleccionarPestania(1, 'Consultar');
    this.formulario.get('clientePropio').setValue(elemento.clientePropio);
    this.listarPorClientePropioDeudor();
  }
  //Obtiene el historial de cuenta corriente por cliente propio
  public listarPorClientePropio(): void {
    let idClientePropio = this.formulario.get('clientePropio').value.id;
    this.cuentaCorrienteServicio.listarPorClientePropio(idClientePropio).subscribe(res => {
      this.listaHistorial = res.json();
    })
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if (elemento != undefined) {
      return elemento.alias ? elemento.alias : elemento;
    } else {
      return elemento;
    }
  }
  //Maneja los evento al presionar una tacla (para pestanias y opciones)
  public manejarEvento(keycode) {
    var indice = this.indiceSeleccionado;
    if (keycode == 113) {
      if (indice < 3) {
        this.seleccionarPestania(indice + 1, this.pestanias[indice]);
      } else {
        this.seleccionarPestania(1, this.pestanias[0]);
      }
    }
  }
  //declaramos los metodos para utilizar el Modal/Dialog
  public openDialog(elemento): void {
    const dialogRef = this.dialog.open(ConsultarDetalleModal, {
      width: '1200px',
      data: { detalle: elemento },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'consultar-detalle-modal',
  templateUrl: 'consultar-detalle-modal.html'
})
export class ConsultarDetalleModal {
  //Define un formulario
  public formulario:FormGroup;
  //Define la lista de detalle
  public detalle:any;
  //Define la lista de formularios venta
  public formulariosVenta:Array<any> = [];
  constructor(public dialogRef: MatDialogRef<ConsultarDetalleModal>, @Inject(MAT_DIALOG_DATA) public data) { }
  ngOnInit() {
    //Establece el formulario
    this.formulario = new FormGroup({
      fecha: new FormControl(),
      numero: new FormControl(),
      precio: new FormControl(),
      estaAnulada: new FormControl()
    })
    //Establece los datos que vienen del html padre
    this.detalle = this.data.detalle;
    //Establece la lista de formularios venta
    this.formulariosVenta = this.detalle.formulariosVenta;
    //Establece los valores
    this.establecerValores();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  //Establece los valores
  private establecerValores(): void {
    this.formulario.get('fecha').setValue(this.detalle.fecha);
    this.formulario.get('numero').setValue(this.detalle.numeroCompleto);
    this.formulario.get('precio').setValue(this.detalle.monto);
    this.formulario.get('estaAnulada').setValue(this.detalle.estaAnulada ? 'Si' : 'No');
  }
}
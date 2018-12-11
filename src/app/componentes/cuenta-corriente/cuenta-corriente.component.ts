import { Component, OnInit } from '@angular/core';
import { CuentaCorrienteService } from 'src/app/servicios/cuenta-corriente.service';
import { FormGroup } from '@angular/forms';
import { CuentaCorriente } from 'src/app/modelos/cuentaCorriente';
import { ClientePropioService } from 'src/app/servicios/cliente-propio.service';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.scss']
})
export class CuentaCorrienteComponent implements OnInit {
  //Define el formulario
  public formulario:FormGroup;
  //Define una lista de clientes
  public resultadosClientes:Array<any> = [];
  //Define la lista de clientes deudores
  public clientesDeudores:Array<any> = [];
  //Constructor
  constructor(private cuentaCorrienteServicio: CuentaCorrienteService, private cuentaCorrienteModelo: CuentaCorriente,
    private clientePropioServicio: ClientePropioService) {}
  ngOnInit() {
    //Establece el formulario
    this.formulario = this.cuentaCorrienteModelo.formulario;
    //Obtiene un cliente por alias
    this.formulario.get('clientePropio').valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.clientePropioServicio.listarPorAlias(data).subscribe(res => {
          this.resultadosClientes = res.json();
        })
      }
    })
  }
  //Obtiene la lista de deudas del cliente por fecha ascendente
  public listarPorClientePropioDeudor(): void {
    let idClientePropio = this.formulario.get('clientePropio').value.id;
    this.cuentaCorrienteServicio.listarPorClientePropioDeudor(idClientePropio).subscribe(res => {
      this.clientesDeudores = res.json();
    })
  }
}

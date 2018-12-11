import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class CuentaCorrienteService {
  //Define la url contra el servicio web
  private url: string;
  private opciones: any;
  //Constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/cuentaCorriente';
    const cabecera: Headers = new Headers();
    cabecera.append('Content-Type', 'application/json');
    this.opciones= new RequestOptions({
      headers: cabecera
    });
  }
  //Obtiene el siguiente Id
  public obtenerSiguienteId() {
    return this.http.get(this.url + '/obtenerSiguienteId');
  }
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //Obtiene un lista por cliente propio
  public listarPorClientePropio(idClientePropio) {
    return this.http.get(this.url + '/listarPorClientePropio/' + idClientePropio);
  }
  //Obtiene un lista por cliente propio deudor
  public listarPorClientePropioDeudor(idClientePropio) {
    return this.http.get(this.url + '/listarPorClientePropioDeudor/' + idClientePropio);
  }
  //Obtiene la deuda total de un cliente
  public obtenerDeudaTotalCliente(idClientePropio) {
    return this.http.get(this.url + '/obtenerDeudaTotalCliente/' + idClientePropio);
  }
  //Obtiene la deuda de cada cliente
  public listarDeudaClientes() {
    return this.http.get(this.url + '/listarDeudaClientes/');
  }
  //Salda una deuda
  public saldar(elemento) {
    return this.http.post(this.url + '/saldar', elemento);
  }
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //actualiza un registro
  public actualizar(elemento) {
    return this.http.put(this.url, elemento);
  }
  //eliminar un registro
  public eliminar(idRegistro) {
    return this.http.delete(this.url, idRegistro);
  }
}
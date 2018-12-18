import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class FacturaVentaService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/facturaVenta';
    const cabecera: Headers = new Headers();
    cabecera.append('Content-Type', 'application/json');
    this.opciones= new RequestOptions({
      headers: cabecera
    });
  }
  //obtiene el siguiente Id
  public obtenerSiguienteId() {
    return this.http.get(this.url + '/obtenerSiguienteId');
  }
  //obtiene el siguiente número
  public obtenerSiguienteNumero() {
    return this.http.get(this.url + '/obtenerSiguienteNumero');
  }
  //obtiene un listado por numero
  public verificarFacturaExistentePorNumero(numero) {
    return this.http.get(this.url + '/obtenerPorNumero/'+numero);
  }
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //lista por fecha
  public listarPorFecha(elemento) {
    return this.http.get(this.url+'/listarPorFecha/'+elemento);
  }
  //lista por mes
  public listarPorMes(elemento) {
    return this.http.get(this.url+'/listarPorMes/'+elemento);
  }
  //lista por año
  public listarPorAnio(elemento) {
    return this.http.get(this.url+'/listarPorAnio/'+elemento);
  }
  //lista por periodo
  public listarPorPeriodo(elemento) {
    return this.http.get(this.url+'/listarPorPeriodo/'+elemento);
  }
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //agrega un registro
  public listarPorFiltros(elemento) {
    return this.http.post(this.url+'/listarPorFiltros', elemento);
  }
  //listar por proveedor
  public listarPorClientePropio(elemento) {
    return this.http.post(this.url+'/listarPorClientePropio', elemento);
  }
  //listar por proveedor
  public listarPortipoFormulario(elemento) {
    return this.http.post(this.url+'/listarPorTipoFormulario', elemento);
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

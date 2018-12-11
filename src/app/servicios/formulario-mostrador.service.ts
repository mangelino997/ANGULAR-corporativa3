import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class FormularioMostradorService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/formularioMostrador';
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
  //obtiene por numero
  public obtenerPorNumero(numero) {
    return this.http.get(this.url + '/obtenerPorNumero'+'/'+numero);
  }
  //obtiene un listado por tipo de formulario y cantidad
  public listarNumeracionDesdeHasta(idTipoFormulario, cantidad) {
    return this.http.get(this.url + '/listarNumeracionDesdeHasta/'+idTipoFormulario+'/'+cantidad);
  }
  //obtiene un listado por tipo de formulario y cantidad
  public listarPorTipoFormularioYCantidad(idTipoFormulario, cantidad) {
    return this.http.get(this.url + '/listarPorTipoFormularioYCantidad/'+idTipoFormulario+'/'+cantidad);
  }
  //obtiene un listado por tipo de formulario y cantidad
  public listarPorTipoFormulario(idTipoFormulario) {
    return this.http.get(this.url + '/listarPorTipoFormulario/'+idTipoFormulario);
  }
  //obtiene un listado por tipo de formulario y cantidad
  public obtenerCantidadPorTipoFormulario(idTipoFormulario) {
    return this.http.get(this.url + '/obtenerCantidadPorTipoFormulario/'+idTipoFormulario);
  }
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //agrega un registro
  public listarPorFiltros(elemento) {
    return this.http.post(this.url+'/listarPorFiltros', elemento);
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

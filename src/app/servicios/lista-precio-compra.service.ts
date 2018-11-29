import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class ListaPrecioCompraService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/listaPrecioCompra';
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
  //obtiene un listado por id de lista precio
  public listarPorListaPrecio(idListaPrecio) {
    return this.http.get(this.url + '/listarPorListaPrecio/'+idListaPrecio);
  }
  //obtiene por lista precio y tipo de formulario
  public obtenerPorListaPrecioYTipoFormulario(listaPrecio, idTipoFormulario) {
    return this.http.get(this.url + '/obtenerPorListaPrecioYTipoFormulario/'+listaPrecio+"/"+idTipoFormulario);
  }
  //obtiene tipo de formulario, cantidad y tipo
  public obtenerPorTipoFormularioYCantidadYTipo(idTipoFormulario, cantidad, tipo) {
    return this.http.get(this.url + '/obtenerPorTipoFormularioYCantidadYTipo/'+idTipoFormulario+"/"+cantidad+"/"+tipo);
  }
  //trae una lista de precios existentes segun id 
  public verificarListaPrecioExistente(idListaPrecio) {
    return this.http.get(this.url + '/verificarListaPrecioExistente/'+idListaPrecio);
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
  public agregarLista(elemento) {
    return this.http.post(this.url+"/agregarLista", elemento);
  }
  //actualiza un registro
  public actualizar(elemento) {
    return this.http.put(this.url, elemento);
  }
  //actualiza un registro
  public actualizarLista(elemento) {
    return this.http.put(this.url+"/actualizarLista", elemento);
  }
  //eliminar un registro
  public eliminar(idRegistro) {
    return this.http.delete(this.url, idRegistro);
  }
}
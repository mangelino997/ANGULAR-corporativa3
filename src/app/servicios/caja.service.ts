
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class CajaService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/caja';
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
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //Obtiene los importes del dia actual
  public obtenerMontos() {
    this.http.get(this.url + '/obtenerMontos');
  }
  //Obtiene la caja de hoy si existe
  public obtenerCajaDeHoy() {
    return this.http.get(this.url + '/obtenerCajaDeHoy');
  }
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //actualiza un registro
  public actualizar(elemento) {
    return this.http.put(this.url, elemento);
  }
  //actualiza el retiro
  public actualizarRetiro(elemento) {
    return this.http.put(this.url + '/actualizarRetiro', elemento);
  }
  //eliminar un registro
  public eliminar(idRegistro) {
    return this.http.delete(this.url, idRegistro);
  }
}
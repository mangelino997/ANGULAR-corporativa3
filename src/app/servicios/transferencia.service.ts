import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/transferencia';
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
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //agrega un registro de Almacen a Mostrador
  public almacenarAMostrador(elemento) {
    return this.http.post(this.url+'/almacenAMostrador', elemento);
  }
  //agrega un registro de Mostrador a Almacen
  public mostradorAAlmacen(elemento) {
    return this.http.post(this.url+'/mostradorAAlmacen', elemento);
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

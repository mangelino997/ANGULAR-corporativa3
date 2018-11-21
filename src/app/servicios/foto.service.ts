import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class FotoService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http, private httpClient: HttpClient) {
    this.url = appService.getUrlBase() + '/foto';
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
  //obtiene un listado por nombre
  public listarPorId(nombre) {
    return this.http.get(this.url + '/listarPorId/'+nombre);
  }
 
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //agrega un registro
  public agregar(e) {
    // var deferred = $q.defer();
    
    // var formData = new FormData();
    var archivo= <File>e.target.files[0];
    // formData.append('archivo', archivo);

    // var headers = new Headers({
    //   'Content-Type': 'multipart/form-data' });

    // return this.http.post(this.url, formData, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    const formdata: FormData = new FormData();
 
    formdata.append('archivo', archivo);
 
    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
     return this.httpClient.request(req);
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

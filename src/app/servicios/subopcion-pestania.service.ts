import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SubopcionPestaniaService {
  //define la url contra el servicio web
  private url: string;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/subopcionPestania';
  }
  //obtiene el listado de pestañas por rol y subopcion
  public listarPestaniasPorSubopcion( idSubopcion) {
    return this.http.get(this.url + '/listarPorSubopcion/' + idSubopcion);
  }
}

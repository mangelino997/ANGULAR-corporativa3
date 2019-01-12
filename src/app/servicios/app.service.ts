import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //Define la IP
  private IP = 'http://localhost:8081'; // localhost:8081 || Pc Blas=http://192.168.0.62:8081
  //Define la url base del servicio web
  public URL_BASE: string = this.IP + '/hibanaws/auth';
  //Constructor
  constructor() {}
  //Obtiene la url base
  public getUrlBase(): string {
    return this.URL_BASE;
  }
  //Obtiene la IP
  public getIP() {
    return this.IP;
  }
}

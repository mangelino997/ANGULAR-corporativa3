import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //Define la IP
  private IP = 'http://192.168.0.99:8081'; 
  //Define la url base del servicio web
  public URL_BASE: string = 'http://192.168.0.62:8081/hibanaws/auth'; // http://192.168.0.99:8081 || localhost:8081 || Pc Blas=http://192.168.0.62:8081
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

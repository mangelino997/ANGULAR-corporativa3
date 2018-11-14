import { Component } from '@angular/core';
import { ModuloService } from './servicios/modulo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hibana';

  public menu: Array<any>;
  constructor(private moduloServicio: ModuloService) {
    this.moduloServicio.obtenerMenuPorRol(1).subscribe(
      res => {
        this.menu = res.json();
        console.log(this.menu);
      }
    );
  }
}



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { RolComponent } from './componentes/rol/rol.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { AutorizadoComponent } from './componentes/autorizado/autorizado.component';

const routes: Routes = [
  {path: '', component: AutorizadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

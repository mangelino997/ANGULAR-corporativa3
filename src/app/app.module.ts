import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Modulo } from 'src/app/modelos/modulo';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatDividerModule,
  MatSelectModule, MatTabsModule, MatIconModule, MatCardModule, MatSidenavModule,
  MatAutocompleteModule, MatInputModule, MatRadioModule, MatTableModule, MatDialogModule,
  MatProgressBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { ModuloService } from './servicios/modulo.service';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { Subopcion } from './modelos/subopcion';
import { SubopcionService } from './servicios/subopcion.service';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { PestaniaService } from './servicios/pestania.service';
import { Pestania } from './modelos/pestania';
import { RolComponent } from './componentes/rol/rol.component';
import { Rol } from './modelos/rol';
import { RolService } from './servicios/rol.service';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { Usuario } from './modelos/usuario';
import { UsuarioService } from './servicios/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    ModuloComponent,
    SubopcionComponent,
    PestaniaComponent,
    RolComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [ModuloService, Modulo, Subopcion, SubopcionService, PestaniaService, Pestania, Rol, RolService, Usuario, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

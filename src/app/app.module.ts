import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Modulo } from 'src/app/modelos/modulo';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


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
import { AutorizadoComponent } from './componentes/autorizado/autorizado.component';
import { AutorizadoService } from './servicios/autorizado.service';
import { Autorizado } from './modelos/autorizado';
import { BilleteComponent } from './componentes/billete/billete.component';
import { BilleteService } from './servicios/billete.service';
import { Billete } from './modelos/billete';
import { GastoComponent } from './componentes/gasto/gasto.component';
import { Gasto } from './modelos/gasto';
import { GastoService } from './servicios/gasto.service';
import { ModalidadPagoComponent } from './componentes/modalidad-pago/modalidad-pago.component';
import { ModalidadPago } from './modelos/modalidadPago';
import { ModalidadPagoService } from './servicios/modalidad-pago.service';
import { ListaPrecioComponent } from './componentes/lista-precio/lista-precio.component';
import { ListaPrecioService } from './servicios/lista-precio.service';
import { ListaPrecio } from './modelos/listaPrecio';
import { TipoFacturaComponent } from './componentes/tipo-factura/tipo-factura.component';
import { TipoFactura } from './modelos/tipoFactura';
import { TipoFacturaService } from './servicios/tipo-factura.service';
import { TipoFormularioComponent } from './componentes/tipo-formulario/tipo-formulario.component';
import { TipoFormularioService } from './servicios/tipo-formulario.service';
import { TipoFormulario } from './modelos/tipoFormulario';
import { ClientePropioComponent, ClientePropioModal } from './componentes/cliente-propio/cliente-propio.component';
import { ClientePropioService } from './servicios/cliente-propio.service';
import { ClientePropio } from './modelos/clientePropio';
import { Foto } from './modelos/foto';
import { FotoService } from './servicios/foto.service';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { Proveedor } from './modelos/proveedor';
import { ProveedorService } from './servicios/proveedor.service';


@NgModule({
  declarations: [
    AppComponent,
    ModuloComponent,
    SubopcionComponent,
    PestaniaComponent,
    RolComponent,
    UsuarioComponent,
    AutorizadoComponent,
    BilleteComponent,
    GastoComponent,
    ModalidadPagoComponent,
    ListaPrecioComponent,
    TipoFacturaComponent,
    TipoFormularioComponent,
    ClientePropioComponent,
    ClientePropioModal,
    ProveedorComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
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
  providers: [
    ModuloService, 
    Modulo, 
    Subopcion, 
    SubopcionService, 
    PestaniaService, 
    Pestania, 
    Rol, 
    RolService, 
    Usuario, 
    UsuarioService, 
    AutorizadoService, 
    Autorizado, 
    BilleteService, 
    Billete, 
    Gasto, 
    GastoService, 
    ModalidadPago, 
    ModalidadPagoService, 
    ListaPrecioService, 
    ListaPrecio,
    TipoFactura,
    TipoFacturaService,
    TipoFormulario,
    TipoFormularioService, 
    ClientePropio,
    ClientePropioService, 
    Foto,
    FotoService,
    Proveedor,
    ProveedorService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClientePropioModal]
})
export class AppModule { }

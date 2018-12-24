import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Modulo } from 'src/app/modelos/modulo';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';

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
import { CompraComponent, FacturasModal } from './componentes/compra/compra.component';
import { ListaPrecioCompra } from './modelos/listaPrecioCompra';
import { ListaPrecioCompraComponent } from './componentes/lista-precio-compra/lista-precio-compra.component';
import { ListaPrecioCompraService } from './servicios/lista-precio-compra.service';
import { ListaPrecioVentaComponent } from './componentes/lista-precio-venta/lista-precio-venta.component';
import { ListaPrecioVentaService } from './servicios/lista-precio-venta.service';
import { CajaComponent } from './componentes/caja/caja.component';
import { CajaService } from './servicios/caja.service';
import { FacturaCompraService } from './servicios/factura-compra.service';
import { FacturaVentaService } from './servicios/factura-venta.service';
import { FormularioMostradorService } from './servicios/formulario-mostrador.service';
import { Caja } from './modelos/caja';
import { VentaComponent, FacturasVentaModal, PdfModal } from './componentes/venta/venta.component';
import { CuentaCorrienteComponent, ConsultarDetalleModal } from './componentes/cuenta-corriente/cuenta-corriente.component';
import { CuentaCorrienteService } from './servicios/cuenta-corriente.service';
import { CuentaCorriente } from './modelos/cuentaCorriente';
import { Transferencia } from './modelos/transferencia';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { FormularioAlmacenService } from './servicios/formulario-almacen.service';
import { StockFormularioService } from './servicios/stock-formulario.service';
import { LoginService } from './servicios/login.service';
import { StockFormularioComponent } from './componentes/stock-formulario/stock-formulario.component';
import { CompraReporteComponent, ReportesModal } from './componentes/compra-reporte/compra-reporte.component';
import { VentaReporteComponent, ReportesVentaModal } from './componentes/venta-reporte/venta-reporte.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

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
    ProveedorComponent,
    CompraComponent,
    ListaPrecioCompraComponent,
    ListaPrecioVentaComponent,
    CajaComponent,
    FacturasModal,
    VentaComponent,
    CuentaCorrienteComponent,
    ConsultarDetalleModal,
    FacturasVentaModal,
    TransferenciaComponent,
    StockFormularioComponent,
    CompraReporteComponent,
    ReportesModal,
    VentaReporteComponent,
    ReportesVentaModal,
    PdfModal,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, 
    MatChipsModule,
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
    ReactiveFormsModule,
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
    ProveedorService,
    ListaPrecioCompra,
    ListaPrecioCompraService,
    ListaPrecioVentaService,
    CajaService,
    FacturaCompraService,
    Caja,
    FacturaVentaService,
    Caja,
    CuentaCorrienteService,
    CuentaCorriente,
    FormularioMostradorService,
    Transferencia,
    FormularioAlmacenService,
    StockFormularioService,
    LoginService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClientePropioModal, FacturasModal, FacturasVentaModal, ConsultarDetalleModal, ReportesModal, ReportesVentaModal, PdfModal]
})
export class AppModule { }
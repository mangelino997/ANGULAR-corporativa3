import { NgModule } from '@angular/core';
import { GuardiaService } from './servicios/guardia.service';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { RolComponent } from './componentes/rol/rol.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { AutorizadoComponent } from './componentes/autorizado/autorizado.component';
import { BilleteComponent } from './componentes/billete/billete.component';
import { GastoComponent } from './componentes/gasto/gasto.component';
import { ModalidadPagoComponent } from './componentes/modalidad-pago/modalidad-pago.component';
import { ListaPrecioComponent } from './componentes/lista-precio/lista-precio.component';
import { TipoFacturaComponent } from './componentes/tipo-factura/tipo-factura.component';
import { TipoFormularioComponent } from './componentes/tipo-formulario/tipo-formulario.component';
import { ClientePropioComponent } from './componentes/cliente-propio/cliente-propio.component';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { CompraComponent } from './componentes/compra/compra.component';
import { ListaPrecioCompraComponent } from './componentes/lista-precio-compra/lista-precio-compra.component';
import { ListaPrecioVentaComponent } from './componentes/lista-precio-venta/lista-precio-venta.component';
import { CajaComponent } from './componentes/caja/caja.component';
import { FacturaCompraService } from './servicios/factura-compra.service';
import { VentaComponent } from './componentes/venta/venta.component';
import { CuentaCorrienteComponent } from './componentes/cuenta-corriente/cuenta-corriente.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { StockFormularioComponent } from './componentes/stock-formulario/stock-formulario.component';
import { CompraReporteComponent } from './componentes/compra-reporte/compra-reporte.component';
import { VentaReporteComponent } from './componentes/venta-reporte/venta-reporte.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  {path: '', component: ClientePropioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'generalesclientes', component: ClientePropioComponent, canActivate: [GuardiaService]},
  {path: 'generalesautorizados', component: AutorizadoComponent, canActivate: [GuardiaService]},
  {path: 'generalesproveedores', component: ProveedorComponent, canActivate: [GuardiaService]},
  {path: 'comprascompra', component: CompraComponent, canActivate: [GuardiaService]},
  {path: 'compraslistadeprecios', component: ListaPrecioCompraComponent, canActivate: [GuardiaService]},
  {path: 'ventasventa', component: VentaComponent, canActivate: [GuardiaService]},
  {path: 'ventaslistasdeprecios', component: ListaPrecioVentaComponent, canActivate: [GuardiaService]},
  {path: 'stockconsultar', component: StockFormularioComponent, canActivate: [GuardiaService]},
  {path: 'stocktransferir', component: TransferenciaComponent, canActivate: [GuardiaService]},
  {path: 'cuentacorrienteadministrar', component: CuentaCorrienteComponent, canActivate: [GuardiaService]},
  {path: 'cajaadministrar', component: CajaComponent, canActivate: [GuardiaService]},
  {path: 'extrastiposdefacturas', component: TipoFacturaComponent, canActivate: [GuardiaService]},
  {path: 'extraslistadeprecios', component: ListaPrecioComponent, canActivate: [GuardiaService]},
  {path: 'extrastiposdeformularios', component: TipoFormularioComponent, canActivate: [GuardiaService]},
  {path: 'extrasmodalidadesdepagos', component: ModalidadPagoComponent, canActivate: [GuardiaService]},
  {path: 'extrasgastos', component: GastoComponent, canActivate: [GuardiaService]},
  {path: 'extrasbilletes', component: BilleteComponent, canActivate: [GuardiaService]},
  {path: 'home', component: HomeComponent, canActivate: [GuardiaService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
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

const routes: Routes = [
  {path: '', component: VentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

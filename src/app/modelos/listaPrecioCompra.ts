import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class ListaPrecioCompra {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            idListasPrecio: new FormControl(),
            idTipoFormulario: new FormControl(),
            precio: new FormControl()
        })
        
    }
}
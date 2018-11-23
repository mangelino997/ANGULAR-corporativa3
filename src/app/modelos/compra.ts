import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Compra {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            numeracionDesde: new FormControl('', Validators.required),
            numeracionHasta: new FormControl('', Validators.required),
            montoTotal: new FormControl('', Validators.required),
            tipoFormulario: new FormControl('', Validators.required),
            facturaCompra: new FormControl('', Validators.required)
        })
        
    }
}
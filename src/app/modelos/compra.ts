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
            fecha: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            monto: new FormControl('', Validators.required),
            increDesc: new FormControl('', Validators.required),
            modalidadPago: new FormControl('', Validators.required),
            proveedor: new FormControl('', Validators.required),
            formulariosCompra: new FormControl('', Validators.required),
        })
        
    }
}
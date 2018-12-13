import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Transferencia {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            version: new FormControl(),
            fecha: new FormControl('',),
            montoTotal: new FormControl(),
            tipo: new FormControl('', ),
            formulariosTransferencia: new FormControl()
        })
        
    }
}
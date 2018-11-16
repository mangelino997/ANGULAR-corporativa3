import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Subopcion {
    //define un formulario FormGroup
    public formulario: FormGroup;
    //constructor
    constructor() {
        // crear el formulario para la seccion de subopciones
        this.formulario= new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            esABM: new FormControl(),
            modulo: new FormControl()
        })
    }
}
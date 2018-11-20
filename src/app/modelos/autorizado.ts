import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Autorizado {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            apellido: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            nombreCompleto: new FormControl('', Validators.maxLength(45)),
            alias: new FormControl('', Validators.maxLength(20)),
            dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            codigoArea: new FormControl('', [Validators.required, Validators.maxLength(6)]),
            telefono: new FormControl('', [Validators.required, Validators.maxLength(10)])
        })
        
    }
}
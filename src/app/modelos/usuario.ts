import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Usuario {
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
            username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            rol: new FormControl(),
            estaActivo:new FormControl('', [Validators.required, Validators.maxLength(20)])
        })
        
    }
}
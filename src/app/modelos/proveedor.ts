import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Proveedor {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            alias: new FormControl('', Validators.maxLength(45)),
            cuit: new FormControl('', [Validators.required, Validators.maxLength(11)]),
            codigoArea: new FormControl('', [Validators.required, Validators.maxLength(6)]),
            telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            direccion: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            correoElectronico: new FormControl('', Validators.maxLength(30)),
            paginaWeb: new FormControl('', Validators.maxLength(20)),
            tipoFactura: new FormControl('', Validators.required),
            listaPrecio: new FormControl('', Validators.required)
        })
        
    }
}
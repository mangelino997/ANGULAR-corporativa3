import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class ClientePropio {
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
            alias: new FormControl('', Validators.maxLength(45)),
            dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            fechaNacimiento: new FormControl('', Validators.required),
            cuil: new FormControl('', [Validators.required, Validators.maxLength(11)]),
            matricula: new FormControl('', Validators.maxLength(20)),
            direccion: new FormControl('', Validators.maxLength(30)),
            direccionAlt: new FormControl('', Validators.maxLength(30)),
            codigoArea: new FormControl('', Validators.maxLength(6)),
            telefono: new FormControl('', Validators.maxLength(10)),
            codigoAreaAlt: new FormControl('', Validators.maxLength(6)),
            telefonoAlt: new FormControl('', Validators.maxLength(10)),
            correoElectronico: new FormControl('', Validators.maxLength(30)),
            foto: new FormControl(''),
            autorizados: new FormControl('')
        })
        
    }
}
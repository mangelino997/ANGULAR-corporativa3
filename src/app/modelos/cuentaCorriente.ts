import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class CuentaCorriente {
    //Define un formulario FormGroup
    public formulario: FormGroup;
    //Constructor
    constructor() {
        //Crea el formulario
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            fecha: new FormControl('', Validators.required),
            facturaVenta: new FormControl('', Validators.required),
            clientePropio: new FormControl('', Validators.required),
            montoTotal: new FormControl('', Validators.required),
            deuda: new FormControl('', Validators.required),
            saldado: new FormControl('', Validators.required),
            estaCancelada: new FormControl(),
            importeASaldar: new FormControl()
        })
    }
}
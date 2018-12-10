import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Caja {
    //define un formulario FormGroup
    public formulario: FormGroup;
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            fecha: new FormControl('', Validators.required),
            montoVenta: new FormControl('', Validators.required),
            montoTransferencia: new FormControl('', Validators.required),
            montoRetiro: new FormControl('', Validators.required),
            montoGasto: new FormControl('', Validators.required),
            montoTotal: new FormControl('', Validators.required),
            sobrante: new FormControl(),
            faltante: new FormControl(),
            importeFinalCaja: new FormControl('', Validators.required),
            billetes: new FormGroup({
                pesos2: new FormControl(),
                pesos5: new FormControl(),
                pesos10: new FormControl(),
                pesos20: new FormControl(),
                pesos50: new FormControl(),
                pesos100: new FormControl(),
                pesos200: new FormControl(),
                pesos500: new FormControl(),
                pesos1000: new FormControl(),
                cantidad: new FormControl(),
                importeTotal: new FormControl()
            })
        })
    }
}
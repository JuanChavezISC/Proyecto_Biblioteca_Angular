import { AbstractControl, ValidationErrors } from "@angular/forms";

export function FechaNoFuturaValidator(control: AbstractControl): ValidationErrors | null {
    if(!control.value) return null;

    const fechaIngresada = new Date(control.value);
    const hoy = new Date();

    fechaIngresada.setHours(0,0,0,0);
    hoy.setHours(0,0,0,0);

    return fechaIngresada > hoy ? {fechaFutura: true}: null;
}

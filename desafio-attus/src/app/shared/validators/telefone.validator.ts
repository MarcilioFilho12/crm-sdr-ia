import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Telefone BR: 10 (fixo) ou 11 (celular com DDD) dígitos. */
export function telefoneBrValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digitos = String(control.value ?? '').replace(/\D/g, '');
    if (digitos.length < 10 || digitos.length > 11) {
      return { telefone: true };
    }
    return null;
  };
}

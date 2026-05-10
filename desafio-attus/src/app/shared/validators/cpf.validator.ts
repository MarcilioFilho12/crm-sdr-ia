import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

/** Valida CPF brasileiro (11 dígitos + dígitos verificadores). */
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = apenasDigitos(control.value ?? '');
    if (cpf.length !== 11) {
      return { cpf: true };
    }
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { cpf: true };
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i], 10) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9], 10)) {
      return { cpf: true };
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i], 10) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[10], 10)) {
      return { cpf: true };
    }
    return null;
  };
}

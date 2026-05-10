import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

describe('cpfValidator', () => {
  const v = cpfValidator();

  it('should accept valid CPF', () => {
    const c = new FormControl('11144477735');
    expect(v(c)).toBeNull();
  });

  it('should reject invalid CPF', () => {
    const c = new FormControl('11111111111');
    expect(v(c)).toEqual({ cpf: true });
  });
});

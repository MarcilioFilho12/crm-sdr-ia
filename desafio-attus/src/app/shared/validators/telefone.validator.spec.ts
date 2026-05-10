import { FormControl } from '@angular/forms';
import { telefoneBrValidator } from './telefone.validator';

describe('telefoneBrValidator', () => {
  const v = telefoneBrValidator();

  it('should accept 11 digits', () => {
    expect(v(new FormControl('11999998888'))).toBeNull();
  });

  it('should reject short number', () => {
    expect(v(new FormControl('123'))).toEqual({ telefone: true });
  });
});

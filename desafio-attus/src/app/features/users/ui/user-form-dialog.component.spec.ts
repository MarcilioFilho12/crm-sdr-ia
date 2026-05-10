import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormDialogComponent } from './user-form-dialog.component';

describe('UserFormDialogComponent', () => {
  describe('create mode', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserFormDialogComponent, NoopAnimationsModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          {
            provide: MatDialogRef,
            useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
          },
        ],
      }).compileComponents();
    });

    it('should create with invalid empty form', () => {
      const fixture = TestBed.createComponent(UserFormDialogComponent);
      expect(fixture.componentInstance.form.invalid).toBeTrue();
    });
  });

  describe('edit mode', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserFormDialogComponent, NoopAnimationsModule],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              usuario: {
                id: 1,
                email: 'a@b.com',
                nome: 'Nome',
                cpf: '11144477735',
                telefone: '11999998888',
                tipoTelefone: 'celular' as const,
              },
            },
          },
          {
            provide: MatDialogRef,
            useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
          },
        ],
      }).compileComponents();
    });

    it('should patch value when editing', () => {
      const fixture = TestBed.createComponent(UserFormDialogComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.form.controls.nome.value).toBe('Nome');
    });
  });
});

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { cpfValidator } from '../../../shared/validators/cpf.validator';
import { telefoneBrValidator } from '../../../shared/validators/telefone.validator';
import { TipoTelefone, Usuario } from '../data-access/usuario.model';

export interface UserFormDialogData {
  usuario?: Usuario;
}

export type UserFormDialogResult =
  | (Omit<Usuario, 'id'> & { id?: number })
  | undefined;

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent, UserFormDialogResult>);
  readonly data = inject<UserFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    nome: ['', Validators.required],
    cpf: ['', [Validators.required, cpfValidator()]],
    telefone: ['', [Validators.required, telefoneBrValidator()]],
    tipoTelefone: this.fb.nonNullable.control<TipoTelefone>('celular', Validators.required),
  });

  readonly tiposTelefone: { valor: TipoTelefone; label: string }[] = [
    { valor: 'celular', label: 'CELULAR' },
    { valor: 'fixo', label: 'FIXO' },
    { valor: 'comercial', label: 'COMERCIAL' },
  ];

  readonly titulo = this.data.usuario ? 'Editar usuário' : 'Adicionar novo usuário';

  ngOnInit(): void {
    const u = this.data.usuario;
    if (u) {
      this.form.patchValue({
        email: u.email,
        nome: u.nome,
        cpf: u.cpf,
        telefone: u.telefone,
        tipoTelefone: u.tipoTelefone,
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }
    const v = this.form.getRawValue();
    const base = {
      email: v.email.trim(),
      nome: v.nome.trim(),
      cpf: v.cpf.replace(/\D/g, ''),
      telefone: v.telefone.replace(/\D/g, ''),
      tipoTelefone: v.tipoTelefone,
    };
    if (this.data.usuario) {
      this.dialogRef.close({ ...base, id: this.data.usuario.id });
    } else {
      this.dialogRef.close(base);
    }
  }
}

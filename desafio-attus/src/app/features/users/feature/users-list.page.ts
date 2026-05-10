import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Usuario } from '../data-access/usuario.model';
import { UsuariosService } from '../data-access/usuarios.service';
import { UserCardComponent } from '../ui/user-card.component';
import {
  UserFormDialogComponent,
  UserFormDialogData,
} from '../ui/user-form-dialog.component';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    UserCardComponent,
  ],
  templateUrl: './users-list.page.html',
  styleUrl: './users-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListPageComponent {
  private readonly usuariosService = inject(UsuariosService);
  private readonly dialog = inject(MatDialog);

  readonly termo = new FormControl('', { nonNullable: true });
  readonly estado = signal<{
    loading: boolean;
    users: Usuario[];
    error: string | null;
  }>({
    loading: false,
    users: [],
    error: null,
  });

  constructor() {
    this.termo.valueChanges
      .pipe(
        startWith(this.termo.value),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.estado.update((s) => ({ ...s, loading: true, error: null }))),
        switchMap((q) =>
          this.usuariosService.listar(q).pipe(
            catchError((err: Error) => {
              this.estado.update((s) => ({
                ...s,
                loading: false,
                error: err.message ?? 'Erro ao carregar',
              }));
              return of([] as Usuario[]);
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((users) => {
        this.estado.set({ loading: false, users, error: null });
      });
  }

  abrirNovo(): void {
    this.abrirDialog({});
  }

  editar(usuario: Usuario): void {
    this.abrirDialog({ usuario });
  }

  private abrirDialog(data: UserFormDialogData): void {
    this.dialog
      .open(UserFormDialogComponent, {
        width: '520px',
        maxWidth: '95vw',
        data,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.usuariosService
          .salvar(result)
          .pipe(take(1))
          .subscribe({
            next: () => this.recarregarListaAposSalvar(),
            error: (err: Error) =>
              this.estado.update((s) => ({ ...s, error: err.message })),
          });
      });
  }

  /** Limpa o filtro de busca para o novo/editado aparecer na lista (filtro é por nome). */
  private recarregarListaAposSalvar(): void {
    this.termo.setValue('', { emitEvent: false });
    this.recarregarLista();
  }

  private recarregarLista(): void {
    const q = this.termo.getRawValue();
    this.estado.update((s) => ({ ...s, loading: true, error: null }));
    this.usuariosService
      .listar(q)
      .pipe(
        take(1),
        catchError((err: Error) => {
          this.estado.update((s) => ({
            ...s,
            loading: false,
            error: err.message ?? 'Erro ao carregar',
          }));
          return of([] as Usuario[]);
        }),
      )
      .subscribe((users) => {
        this.estado.set({ loading: false, users, error: null });
      });
  }
}

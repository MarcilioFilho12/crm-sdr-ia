import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../data-access/usuario.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  readonly usuario = input.required<Usuario>();
  readonly editar = output<Usuario>();

  onEditar(): void {
    this.editar.emit(this.usuario());
  }
}

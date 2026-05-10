import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Usuario } from './usuario.model';
import { USUARIOS_MOCK_INICIAL } from './usuarios.mock';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private usuarios: Usuario[] = [...USUARIOS_MOCK_INICIAL];
  private nextId = this.usuarios.reduce((m, u) => Math.max(m, u.id), 0) + 1;

  /** Lista usuários opcionalmente filtrados por nome (case-insensitive). */
  listar(filtroNome: string): Observable<Usuario[]> {
    const termo = filtroNome.trim().toLowerCase();
    return of(this.usuarios).pipe(
      delay(280),
      map((lista) =>
        termo ? lista.filter((u) => u.nome.toLowerCase().includes(termo)) : [...lista],
      ),
    );
  }

  /** Cria ou atualiza usuário no armazenamento em memória. */
  salvar(dados: Omit<Usuario, 'id'> & { id?: number }): Observable<Usuario> {
    if (dados.id != null) {
      const idx = this.usuarios.findIndex((u) => u.id === dados.id);
      if (idx === -1) {
        return throwError(() => new Error('Usuário não encontrado'));
      }
      const atualizado: Usuario = {
        id: dados.id,
        email: dados.email,
        nome: dados.nome,
        cpf: dados.cpf,
        telefone: dados.telefone,
        tipoTelefone: dados.tipoTelefone,
      };
      this.usuarios = [...this.usuarios.slice(0, idx), atualizado, ...this.usuarios.slice(idx + 1)];
      return of(atualizado).pipe(delay(200));
    }
    const novo: Usuario = {
      id: this.nextId++,
      email: dados.email,
      nome: dados.nome,
      cpf: dados.cpf,
      telefone: dados.telefone,
      tipoTelefone: dados.tipoTelefone,
    };
    this.usuarios = [...this.usuarios, novo];
    return of(novo).pipe(delay(200));
  }
}

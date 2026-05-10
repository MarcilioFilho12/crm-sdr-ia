import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list users after delay', fakeAsync(() => {
    let count = 0;
    service.listar('').subscribe((users) => {
      count = users.length;
    });
    tick(400);
    expect(count).toBeGreaterThan(0);
  }));

  it('should filter by name', fakeAsync(() => {
    let names: string[] = [];
    service.listar('Giana').subscribe((users) => {
      names = users.map((u) => u.nome);
    });
    tick(400);
    expect(names.length).toBeGreaterThan(0);
    expect(names[0].toLowerCase()).toContain('giana');
  }));

  it('should create user', fakeAsync(() => {
    let id = 0;
    service
      .salvar({
        email: 'novo@teste.com',
        nome: 'Novo User',
        cpf: '11144477735',
        telefone: '11988887777',
        tipoTelefone: 'celular',
      })
      .subscribe((u) => {
        id = u.id;
      });
    tick(300);
    expect(id).toBeGreaterThan(0);
  }));
});

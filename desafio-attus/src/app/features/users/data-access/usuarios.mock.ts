import { Usuario } from './usuario.model';

/** Telefone nacional (DDD + número); +55 48 99638-5461 → 48996385461 para validação BR no app. */
export const USUARIOS_MOCK_INICIAL: Usuario[] = [
  {
    id: 1,
    email: 'giana@attomatus.com.br',
    nome: 'Giana Sandrini',
    cpf: '11144477735',
    telefone: '11999887766',
    tipoTelefone: 'celular',
  },
  {
    id: 2,
    email: 'marciliochu@gmail.com',
    nome: 'Marcilio Alano Filho',
    cpf: '07448116940',
    telefone: '48996385461',
    tipoTelefone: 'celular',
  },
  {
    id: 3,
    email: 'ana.costa@empresa.com',
    nome: 'Ana Paula Costa',
    cpf: '39053344705',
    telefone: '21988776655',
    tipoTelefone: 'celular',
  },
  {
    id: 4,
    email: 'bruno.oliveira@teste.org',
    nome: 'Bruno Oliveira',
    cpf: '52998224725',
    telefone: '31991234567',
    tipoTelefone: 'fixo',
  },
  {
    id: 5,
    email: 'carla.mendes@mail.com',
    nome: 'Carla Mendes',
    cpf: '85351346893',
    telefone: '4133334455',
    tipoTelefone: 'comercial',
  },
  {
    id: 6,
    email: 'diego.santos@exemplo.net',
    nome: 'Diego Santos',
    cpf: '23100299900',
    telefone: '6199887766',
    tipoTelefone: 'celular',
  },
];
export type TipoTelefone = 'celular' | 'fixo' | 'comercial';

export interface Usuario {
  readonly id: number;
  readonly email: string;
  readonly nome: string;
  readonly cpf: string;
  readonly telefone: string;
  readonly tipoTelefone: TipoTelefone;
}

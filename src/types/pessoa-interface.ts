export type Pessoa = {
  id: string;
  nome: string;
  funcao?: "Professor" | "Auxiliar" | "Coord";
  turma?: string;
  nascimento: string; // formato YYYY-MM-DD
};
export type Upcoming = {
  contact_id: string;
  full_name: string;
  role: string | null;
  birthdate: string;
  next_birthday: string;
  turning_age: number;
};

export type Filtro = "Hoje" | "Próx. 7 dias" | "Este mês" | "Todos";
export const FILTROS: Filtro[] = ["Hoje", "Próx. 7 dias", "Este mês", "Todos"];

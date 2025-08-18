import { useEffect, useState, useMemo, useCallback } from "react";

import { Filtro, Upcoming } from "../src/types/birthdays";
import { getBirthdaysAllNextYear, getBirthdaysNext7d, getBirthdaysThisMonth, getBirthdaysToday } from "@/src/lib/contacts";

export function useBirthdays(filtro: Filtro) {
  const [lista, setLista] = useState<Upcoming[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      let data: Upcoming[] = [];
      if (filtro === "Hoje") data = await getBirthdaysToday();
      else if (filtro === "Próx. 7 dias") data = await getBirthdaysNext7d();
      else if (filtro === "Este mês") data = await getBirthdaysThisMonth();
      else data = await getBirthdaysAllNextYear(); // "Todos"
      setLista(data);
    } catch (e: any) {
      setErr(e?.message ?? "Erro ao carregar aniversários");
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => { load(); }, [load]);

  const aniversarianteHoje = useMemo(
    () => (filtro === "Hoje" && lista.length ? lista[0] : null),
    [filtro, lista]
  );

  return {
    lista,
    loading,
    err,
    aniversarianteHoje,
    reload: load,
  };
}

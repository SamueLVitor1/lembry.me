// src/lib/contacts.ts
import { supabase } from './supabase';

export type Upcoming = {
  contact_id: string;
  full_name: string;
  role: string | null;
  birthdate: string;      // YYYY-MM-DD
  next_birthday: string;  // YYYY-MM-DD
  turning_age: number;
};

// Helper: YYYY-MM-DD no fuso local (evita "pular" dia por UTC)
function fmtLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function getBirthdaysToday() {
  const today = fmtLocal(new Date());
  const { data, error } = await supabase
    .from('v_upcoming_birthdays')
    .select('*')
    .eq('next_birthday', today)
    .order('full_name', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Upcoming[];
}

export async function getBirthdaysNext7d() {
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 7);

  const { data, error } = await supabase
    .from('v_upcoming_birthdays')
    .select('*')
    .gt('next_birthday', fmtLocal(from))
    .lte('next_birthday', fmtLocal(to))
    .order('next_birthday', { ascending: true })
    .order('full_name', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Upcoming[];
}

export async function getBirthdaysThisMonth() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from('v_upcoming_birthdays')
    .select('*')
    .gte('next_birthday', fmtLocal(first))
    .lte('next_birthday', fmtLocal(last))
    .order('next_birthday', { ascending: true })
    .order('full_name', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Upcoming[];
}

// "Todos": próximos 365 dias
export async function getBirthdaysAllNextYear() {
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 365);

  const { data, error } = await supabase
    .from('v_upcoming_birthdays')
    .select('*')
    .gte('next_birthday', fmtLocal(from))
    .lte('next_birthday', fmtLocal(to))
    .order('next_birthday', { ascending: true })
    .order('full_name', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Upcoming[];
}

// src/lib/contacts.ts
import { NewContact } from '../types/birthdays';
import { supabase } from './supabase';

export type Upcoming = {
  contact_id: string;
  full_name: string;
  role: string | null;
  birthdate: string;     
  next_birthday: string;  
  turning_age: number;
};


export function formatPt(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const day = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(d);
  return `${day} de ${month}`;
}

export function groupByNextBirthday(list: { next_birthday: string }[]) {
  const map = new Map<string, any[]>();
  list.forEach((it) => {
    const label = formatPt(it.next_birthday);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(it);
  });
  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}


export function fmtLocal(d: Date) {
  return d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
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

export async function createContact(input: NewContact) {
  const payload = {
    full_name: input.full_name.trim(),
    role: input.role?.trim() || null,
    birthdate: input.birthdate, // já no formato YYYY-MM-DD
  };

  const { data, error } = await supabase
    .from('contacts')
    .insert(payload)
    .select('id, full_name, role, birthdate')
    .single();

  if (error) throw error;
  return data;
}

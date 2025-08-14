// app/(tabs)/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  getBirthdaysToday,
  getBirthdaysNext7d,
  getBirthdaysThisMonth,
  Upcoming,
} from "../../src/lib/contacts";

// filtros disponíveis
const filtros = ["Hoje", "Próx. 7 dias", "Este mês", "Todos"];

export default function HomeScreen() {
  const [selFiltro, setSelFiltro] = useState("Hoje");
  const [lista, setLista] = useState<Upcoming[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // carrega dados conforme filtro
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        let data: Upcoming[] = [];
        if (selFiltro === "Hoje") data = await getBirthdaysToday();
        else if (selFiltro === "Próx. 7 dias") data = await getBirthdaysNext7d();
        else if (selFiltro === "Este mês") data = await getBirthdaysThisMonth();
        else {
          // "Todos" = este mês como fallback simples (pra não trazer o ano inteiro)
          data = await getBirthdaysThisMonth();
        }
        if (mounted) setLista(data);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? "Erro ao carregar aniversários");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selFiltro]);

  const aniversarianteHoje = useMemo(
    () => (selFiltro === "Hoje" && lista.length ? lista[0] : null),
    [selFiltro, lista]
  );

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.brand}>LembryMe</Text>
        <TouchableOpacity style={s.bell} onPress={() => {}} accessibilityLabel="Notificações">
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.chipsContainer}
        contentContainerStyle={s.chipsRow}
      >
        {filtros.map((f) => {
          const active = f === selFiltro;
          return (
            <TouchableOpacity
              key={f}
              style={[s.chip, active && s.chipActive]}
              onPress={() => setSelFiltro(f)}
            >
              <Text style={[s.chipText, active && s.chipTextActive]} numberOfLines={1}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Destaque de hoje */}
      {aniversarianteHoje && (
        <View style={s.highlight}>
          <Text style={s.highlightEmoji}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.highlightTitle}>
              Hoje é aniversário do {aniversarianteHoje.full_name}
            </Text>
            <Text style={s.highlightSub}>
              {aniversarianteHoje.role ?? "Contato"} • {formatPt(aniversarianteHoje.next_birthday)}
            </Text>
          </View>
          <TouchableOpacity style={s.cta} onPress={() => {}}>
            <Text style={s.ctaText}>Enviar Parabéns</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Estados de carregamento/erro/vazio */}
      {loading ? (
        <Text style={s.stateText}>Carregando…</Text>
      ) : err ? (
        <Text style={[s.stateText, { color: "#b00020" }]}>{err}</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(i) => i.contact_id}
          contentContainerStyle={{ paddingBottom: 96 }}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          ListEmptyComponent={
            <Text style={s.stateText}>Nenhum aniversário encontrado.</Text>
          }
          renderItem={({ item }) => <PessoaItem p={item} />}
        />
      )}

      {/* FAB (futuro: abrir tela de adicionar) */}
      {/* <TouchableOpacity style={s.fab} onPress={() => router.push('/add-contact')}> */}
      {/*   <Text style={s.fabPlus}>＋</Text> */}
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
}

function PessoaItem({ p }: { p: Upcoming }) {
  return (
    <View style={s.item}>
      {/* Avatar simples com inicial (depois dá pra trocar por imagem) */}
      <View style={s.avatarWrap}>
        <View style={[s.avatar, s.avatarFallback]}>
          <Text style={s.avatarTxt}>{p.full_name[0]}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={s.nome}>{p.full_name}</Text>
        <Text style={s.meta}>
          {(p.role ?? "Contato") + " • " + formatPt(p.next_birthday)}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={s.data}>{formatPt(p.next_birthday)}</Text>
        <View style={s.ageBadge}>
          <Text style={s.ageText}>{p.turning_age}</Text>
        </View>
      </View>
    </View>
  );
}

// util: "24 de maio"
function formatPt(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const day = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(d);
  return `${day} de ${month}`;
}

/* ===== Styles ===== */
const C = {
  bg: "#F7F8F9",
  fg: "#0C3C3B",
  text: "#2E3A3A",
  sub: "#6A7777",
  pill: "#E7F0EE",
  pillText: "#0C3C3B",
  pillActiveBg: "#0C3C3B",
  pillActiveText: "#FFFFFF",
  card: "#FFE08A",
  cta: "#0C3C3B",
  divider: "#E6EAEA",
  badge: "#1D8E7A",
  white: "#FFFFFF",
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 4, paddingBottom: 6 },
  brand: { fontSize: 26, fontWeight: "800", color: C.fg, letterSpacing: 0.3 },
  bell: { marginLeft: "auto", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 14, backgroundColor: C.pill },

  chipsContainer: { height: 52, flexGrow: 0, marginBottom: 8 },
  chipsRow: { alignItems: "center", gap: 8, paddingHorizontal: 4 },
  chip: { height: 36, paddingHorizontal: 14, borderRadius: 18, backgroundColor: C.pill, alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  chipActive: { backgroundColor: C.pillActiveBg },
  chipText: { color: C.pillText, fontWeight: "600" },
  chipTextActive: { color: C.pillActiveText },

  highlight: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 16, padding: 14, gap: 12, marginBottom: 8 },
  highlightEmoji: { fontSize: 22 },
  highlightTitle: { fontSize: 16, fontWeight: "700", color: C.text },
  highlightSub: { fontSize: 13, color: C.sub, marginTop: 2 },
  cta: { backgroundColor: C.cta, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
  ctaText: { color: C.white, fontWeight: "700", fontSize: 12 },

  separator: { height: 1, backgroundColor: C.divider, marginLeft: 68 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  avatarWrap: { width: 52, marginRight: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  avatarFallback: { backgroundColor: "#DDE6E4", alignItems: "center", justifyContent: "center" },
  avatarTxt: { fontSize: 18, fontWeight: "800", color: C.fg },
  nome: { fontSize: 16, fontWeight: "700", color: C.text },
  meta: { fontSize: 13, color: C.sub, marginTop: 2 },
  data: { fontSize: 13, color: C.sub, marginBottom: 6 },
  ageBadge: { backgroundColor: C.badge, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, alignSelf: "flex-end" },
  ageText: { color: C.white, fontWeight: "800", fontSize: 12 },

  fab: { position: "absolute", right: 20, bottom: 28, backgroundColor: C.fg, width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
  fabPlus: { fontSize: 28, color: C.white, marginTop: -2 },

  stateText: { textAlign: "center", color: C.sub, marginTop: 16 },
});

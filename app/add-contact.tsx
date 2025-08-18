import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { createContact } from "@/src/lib/contacts";
import { theme } from "@/constants/theme";

const ROLES = ["Amiga", "Colega", "Família", "Professor(a)", "Outro"];

function toYYYYMMDD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatDisplay(d?: Date | null) {
  if (!d) return "Selecionar data";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    .format(d)
    .replace(".", "");
}

export default function AddContactScreen() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ name?: boolean; date?: boolean }>({});

  const nameError = useMemo(() => {
    if (!touched.name) return "";
    if (name.trim().length < 2) return "Digite pelo menos 2 caracteres.";
    return "";
  }, [name, touched]);

  const dateError = useMemo(() => {
    if (!touched.date) return "";
    if (!date) return "Escolha a data de nascimento.";
    return "";
  }, [date, touched]);

  const valid = name.trim().length >= 2 && !!date;

  const onChangeDate = (_: DateTimePickerEvent, sel?: Date) => {
    if (sel) setDate(sel);
    // Android fecha automático ao escolher
    if (Platform.OS === "android") setShowPicker(false);
  };

  async function handleSave() {
    setTouched({ name: true, date: true });
    if (!valid || !date) return;
    try {
      setLoading(true);
      await createContact({
        full_name: name,
        role: role || null,
        birthdate: toYYYYMMDD(date),
      });
      router.replace({ pathname: "/result", params: { status: "success", name } });
    } catch (e: any) {
      router.replace({
        pathname: "/result",
        params: { status: "error", msg: e?.message ?? "Falha ao criar contato" },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.iconBtn} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={theme.colors.fg} />
          </TouchableOpacity>
          <Text style={s.title}>Novo contato</Text>
          <View style={{ width: 40 }} />{/* spacer */}
        </View>

        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          {/* Nome */}
          <View style={[s.card, nameError ? s.cardError : null]}>
            <Text style={s.label}>Nome completo</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Ex.: Maria Teste"
              autoCapitalize="words"
              autoCorrect={false}
              style={s.input}
            />
            {!!nameError && <Text style={s.error}>{nameError}</Text>}
          </View>

          {/* Relação */}
          <View style={s.card}>
            <Text style={s.label}>Relação</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipsRow}>
              {ROLES.map((r) => {
                const active = role === r;
                return (
                  <TouchableOpacity key={r} onPress={() => setRole(active ? "" : r)} style={[s.chip, active && s.chipActive]}>
                    <Text style={[s.chipText, active && s.chipTextActive]}>{r}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TextInput
              value={role}
              onChangeText={setRole}
              placeholder="Ex.: Amiga, Colega, Família…"
              autoCapitalize="sentences"
              style={[s.input, { marginTop: 4 }]}
            />
          </View>

          {/* Data de nascimento */}
          <View style={[s.card, dateError ? s.cardError : null]}>
            <Text style={s.label}>Data de nascimento</Text>

            <Pressable onPress={() => setShowPicker((v) => !v)} onBlur={() => setTouched((t) => ({ ...t, date: true }))} style={s.dateInput}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
              <Text style={[s.dateText, { color: date ? "#111827" : "#9CA3AF" }]}>{formatDisplay(date)}</Text>
              <Ionicons name={showPicker ? "chevron-up" : "chevron-down"} size={18} color="#6B7280" />
            </Pressable>

            {showPicker && (
              <View style={{ marginTop: 8 }}>
                <DateTimePicker
                  mode="date"
                  value={date ?? new Date(2000, 0, 1)}
                  onChange={onChangeDate}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                />
                {Platform.OS === "ios" && (
                  <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 6 }}>
                    <TouchableOpacity onPress={() => setShowPicker(false)} style={s.doneBtn}>
                      <Text style={s.doneText}>Concluir</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {!!dateError && <Text style={s.error}>{dateError}</Text>}
          </View>
        </ScrollView>

        {/* Footer actions */}
        <View style={s.footer}>
          <TouchableOpacity style={s.btnGhost} onPress={() => router.back()} disabled={loading}>
            <Text style={s.btnGhostText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.btnPrimary, (!valid || loading) && s.btnDisabled]} onPress={handleSave} disabled={!valid || loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnPrimaryText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.space.lg,
    paddingTop: 6,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "800", color: theme.colors.fg },
  content: { paddingHorizontal: theme.space.lg, paddingBottom: 16, gap: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "rgba(16,24,40,0.06)",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 1,
  },
  cardError: { borderWidth: 1, borderColor: "#EF4444" },
  label: { fontSize: 12, color: "#6B7280", marginBottom: 6 },
  input: { fontSize: 16, paddingVertical: 8 },
  error: { marginTop: 6, color: "#B00020", fontSize: 12 },
  chipsRow: { gap: 8, paddingVertical: 4 },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#ECF3F1",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: theme.colors.pillActive },
  chipText: { color: theme.colors.fg, fontWeight: "600" },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  dateInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  dateText: { fontSize: 16, flex: 1 },
  doneBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
  },
  doneText: { fontWeight: "700", color: "#334155" },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: theme.space.lg,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.colors.bg,
  },
  btnGhost: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhostText: { color: "#334155", fontWeight: "700" },
  btnPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.fg,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: { backgroundColor: "#9CA3AF" },
  btnPrimaryText: { color: "#fff", fontWeight: "800" },
});

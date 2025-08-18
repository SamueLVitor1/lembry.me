import { View, Text, TouchableOpacity } from "react-native";
import { Upcoming } from "@/src/types/birthdays";
import  {formatPt}  from "../src/lib/contacts";

export function TodayHighlight({ p }: { p: Upcoming }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFE08A",
      borderRadius: 16, padding: 14, gap: 12, marginBottom: 8 }}>
      <Text style={{ fontSize: 22 }}>🎉</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E3A3A" }}>
          Hoje é aniversário do {p.full_name}
        </Text>
        <Text style={{ fontSize: 13, color: "#6A7777", marginTop: 2 }}>
          {(p.role ?? "Contato")} • {formatPt(p.next_birthday)}
        </Text>
      </View>
      <TouchableOpacity style={{ backgroundColor: "#0C3C3B", borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Enviar Parabéns</Text>
      </TouchableOpacity>
    </View>
  );
}

// src/components/today-highlight.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Upcoming } from "@/src/types/birthdays";
import { formatPt } from "@/src/lib/contacts";


export function TodayHighlight({ p, onPressCongrats }: { p: Upcoming; onPressCongrats?: (p: Upcoming) => void }) {
  return (
    <LinearGradient
      colors={["#4CC8A3", "#2E8C78"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 14,
        shadowColor: "rgba(16,24,40,0.2)",
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 22, marginRight: 10 }}>🎉</Text>

        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
            Hoje é aniversário de {p.full_name}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 2 }}>
            {(p.role ?? "Contato")} • {formatPt(p.next_birthday)} • {p.turning_age} anos
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => onPressCongrats?.(p)}
          style={{
            backgroundColor: "#fff",
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: "#0B3C35", fontWeight: "700", fontSize: 12 }}>
            Parabenizar
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

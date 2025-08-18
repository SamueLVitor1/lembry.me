import { View, Text } from "react-native";
import { Upcoming } from "@/src/types/birthdays";
import { Avatar } from "./avatar";
import { formatPt } from "@/src/lib/contacts";
import { AgeBadge } from "./age-badge";

export function BirthdayItem({ p }: { p: Upcoming }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 18, // 16 → 18
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginVertical: 8, // 6 → 8
        shadowColor: "rgba(16,24,40,0.06)",
        shadowOpacity: 1,
        shadowRadius: 8, // 6 → 8
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Avatar gradiente */}
      <View style={{ marginRight: 14 }}>
        <Avatar name={p.full_name} />
      </View>

      {/* Nome + subtítulo */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#263238" }}>
          {p.full_name}
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
          {p.role ?? "Contato"} • {formatPt(p.next_birthday)}
        </Text>
      </View>

      {/* Lado direito: data + idade */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>
          {formatPt(p.next_birthday)}
        </Text>
        <AgeBadge age={p.turning_age} />
      </View>
    </View>
  );
}

import { View, Text } from "react-native";
import { Upcoming } from "@/src/types/birthdays";
import  {formatPt}  from "../src/lib/contacts";

export function BirthdayItem({ p }: { p: Upcoming }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}>
      <View style={{ width: 52, marginRight: 16 }}>
        <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#DDE6E4",
          alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#0C3C3B" }}>{p.full_name[0]}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E3A3A" }}>{p.full_name}</Text>
        <Text style={{ fontSize: 13, color: "#6A7777", marginTop: 2 }}>
          {(p.role ?? "Contato")} • {formatPt(p.next_birthday)}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 13, color: "#6A7777", marginBottom: 6 }}>{formatPt(p.next_birthday)}</Text>
        <View style={{ backgroundColor: "#1D8E7A", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, alignSelf: "flex-end" }}>
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 12 }}>{p.turning_age}</Text>
        </View>
      </View>
    </View>
  );
}

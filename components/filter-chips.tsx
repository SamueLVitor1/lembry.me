import { ScrollView, TouchableOpacity, Text } from "react-native";
import { FILTROS, Filtro } from "@/src/types/birthdays";

export function FilterChips({
  value,
  onChange,
}: { value: Filtro; onChange: (f: Filtro) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 52, flexGrow: 0, marginBottom: 8 }}
      contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 4 }}
    >
      {FILTROS.map((f) => {
        const active = f === value;
        return (
          <TouchableOpacity
            key={f}
            onPress={() => onChange(f)}
            style={{
              height: 36, paddingHorizontal: 14, borderRadius: 18,
              backgroundColor: active ? "#0C3C3B" : "#E7F0EE",
              alignItems: "center", justifyContent: "center", alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: active ? "#fff" : "#0C3C3B", fontWeight: "600" }} numberOfLines={1}>
              {f}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

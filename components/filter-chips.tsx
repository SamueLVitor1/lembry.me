import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { FILTROS, Filtro } from "@/src/types/birthdays";
import { theme } from "@/constants/theme";


export function FilterChips({ value, onChange }: { value: Filtro; onChange: (f: Filtro) => void }) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.white, borderRadius: theme.radius.lg,
        paddingVertical: 8, paddingHorizontal: 8, marginBottom: theme.space.md,
        shadowColor: theme.colors.shadow, shadowOpacity: 1, shadowRadius: 10, elevation: 2,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {FILTROS.map((f) => {
          const active = f === value;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => onChange(f)}
              style={{
                height: 36, paddingHorizontal: 14, borderRadius: theme.radius.pill,
                backgroundColor: active ? theme.colors.pillActive : theme.colors.pill,
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Text style={{ color: active ? "#fff" : theme.colors.fg, fontWeight: "700" }} numberOfLines={1}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

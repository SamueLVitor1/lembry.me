import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";
import { Link, router } from "expo-router"; // <- opção recomendada

export function AppHeader() {
  return (
    <LinearGradient
      colors={["#E8F5F2", "#F6F8FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: theme.radius.lg,
        padding: theme.space.lg,
        marginTop: 4,
        marginBottom: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: theme.colors.fg,
            letterSpacing: 0.3,
          }}
        >
          lembry.me
        </Text>

        <TouchableOpacity
          accessibilityLabel="Notificações"
          onPress={() => {}}
          style={s.bell}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
          <View style={s.badge} />
        </TouchableOpacity>

        {/* FAB de adicionar contato */}
        <TouchableOpacity
          style={s.fab}
          onPress={() => router.push({ pathname: "/add-contact" })}
        >
          <Text style={s.fabPlus}>＋</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  bell: {
    marginLeft: "auto",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    shadowColor: "rgba(16,24,40,0.08)",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    backgroundColor: "#FF5A5F",
    borderRadius: 99,
  },
  fab: {
    marginLeft: 8,
    backgroundColor: theme.colors.fg,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(16,24,40,0.12)",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  fabPlus: { fontSize: 22, color: "#fff", marginTop: -2, fontWeight: "800" },
});

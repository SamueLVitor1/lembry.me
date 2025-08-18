import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";


export function AppHeader() {
  return (
    <LinearGradient
      colors={["#E8F5F2", "#F6F8FA"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{ borderRadius: theme.radius.lg, padding: theme.space.lg, marginTop: 4, marginBottom: 8 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: theme.colors.fg, letterSpacing: 0.3 }}>
          LembryMe
        </Text>

        <TouchableOpacity
          accessibilityLabel="Notificações"
          onPress={() => {}}
          style={{
            marginLeft: "auto",
            backgroundColor: theme.colors.white,
            paddingHorizontal: 12, paddingVertical: 10, borderRadius: theme.radius.lg,
            shadowColor: theme.colors.shadow, shadowOpacity: 1, shadowRadius: 8, elevation: 3,
          }}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
          {/* badge opcional */}
          <View style={{
            position: "absolute", right: 6, top: 6, width: 8, height: 8,
            backgroundColor: "#FF5A5F", borderRadius: 99,
          }}/>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

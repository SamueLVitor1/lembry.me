import { View, Text, TouchableOpacity } from "react-native";

export function AppHeader() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4, paddingBottom: 6 }}>
      <Text style={{ fontSize: 26, fontWeight: "800", color: "#0C3C3B", letterSpacing: 0.3 }}>
        LembryMe
      </Text>
      <TouchableOpacity
        style={{ marginLeft: "auto", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 14, backgroundColor: "#E7F0EE" }}
        accessibilityLabel="Notificações"
        onPress={() => {}}
      >
        <Text style={{ fontSize: 18 }}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}

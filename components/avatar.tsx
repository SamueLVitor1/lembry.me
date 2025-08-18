import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Avatar({ name }: { name: string }) {
  const initial = name[0]?.toUpperCase() ?? "?";

  return (
    <LinearGradient
      colors={["#4CC8A3", "#2E8C78"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
        {initial}
      </Text>
    </LinearGradient>
  );
}

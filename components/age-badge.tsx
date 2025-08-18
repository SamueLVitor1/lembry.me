import { View, Text } from "react-native";

export function AgeBadge({ age }: { age: number }) {
  return (
    <View
      style={{
        backgroundColor: "#0C3C3B",
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 28,
        alignItems: "center",
        shadowColor: "rgba(0,0,0,0.08)",
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 11 }}>
        {age}
      </Text>
    </View>
  );
}

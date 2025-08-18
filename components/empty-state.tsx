import { View, Text } from "react-native";

export function EmptyState({ text }: { text: string }) {
  return (
    <View style={{ paddingVertical: 16 }}>
      <Text style={{ textAlign: "center", color: "#6A7777" }}>{text}</Text>
    </View>
  );
}

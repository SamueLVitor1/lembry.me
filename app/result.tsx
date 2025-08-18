import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ResultScreen() {
  const params = useLocalSearchParams<{ status?: string; name?: string; msg?: string }>();
  const ok = params.status === "success";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F8FA", padding: 16, alignItems: "center", justifyContent: "center" }}>
      <View style={{
        width: "100%", backgroundColor: "#fff", borderRadius: 16, padding: 20,
        shadowColor: "rgba(0,0,0,0.08)", shadowOpacity: 1, shadowRadius: 8, elevation: 2,
        alignItems: "center",
      }}>
        <Text style={{ fontSize: 48, marginBottom: 8 }}>{ok ? "✅" : "❌"}</Text>
        <Text style={{ fontSize: 18, fontWeight: "800", color: ok ? "#0C3C3B" : "#B00020", textAlign: "center" }}>
          {ok ? "Contato criado com sucesso!" : "Não foi possível criar o contato"}
        </Text>
        <Text style={{ marginTop: 8, color: "#6B7280", textAlign: "center" }}>
          {ok
            ? `“${params.name ?? ""}” foi adicionado à sua lista.`
            : (params.msg ?? "Tente novamente mais tarde.")}
        </Text>

        <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
          {!ok && (
            <TouchableOpacity
              style={{ height: 46, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#EEF2F5", alignItems: "center", justifyContent: "center" }}
              onPress={() => router.replace("/add-contact")}
            >
              <Text style={{ color: "#334155", fontWeight: "700" }}>Tentar novamente</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ height: 46, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#0C3C3B", alignItems: "center", justifyContent: "center" }}
            onPress={() => router.replace("/")}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

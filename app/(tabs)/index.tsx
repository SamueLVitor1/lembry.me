import React, { useState } from "react";
import { SafeAreaView, View, FlatList, RefreshControl } from "react-native";

import { Filtro } from "@/src/types/birthdays";
import { useBirthdays } from "@/hooks/useBirthdays";
import { AppHeader } from "@/components/app-header";
import { FilterChips } from "@/components/filter-chips";
import { TodayHighlight } from "@/components/today-highlight";
import { BirthdayItem } from "@/components/BirthdayItem";
import { EmptyState } from "@/components/EmptyState";

export default function HomeScreen() {
  const [filtro, setFiltro] = useState<Filtro>("Hoje");
  const { lista, aniversarianteHoje, loading, err, reload } = useBirthdays(filtro);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8F9", paddingHorizontal: 16 }}>
      <AppHeader />
      <FilterChips value={filtro} onChange={setFiltro} />

      {aniversarianteHoje ? <TodayHighlight p={aniversarianteHoje} /> : null}

      <FlatList
        data={lista}
        keyExtractor={(i) => i.contact_id}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#E6EAEA", marginLeft: 68 }} />}
        renderItem={({ item }) => <BirthdayItem p={item} />}
        ListEmptyComponent={<EmptyState text={loading ? "Carregando…" : err ?? "Nenhum aniversário encontrado."} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
        contentContainerStyle={{ paddingBottom: 96 }}
      />
    </SafeAreaView>
  );
}

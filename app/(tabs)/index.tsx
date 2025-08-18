import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  SectionList,
  RefreshControl,
  Text,
} from "react-native";
import { Filtro } from "@/src/types/birthdays";
import { useBirthdays } from "@/hooks/useBirthdays";
import { AppHeader } from "@/components/app-header";
import { FilterChips } from "@/components/filter-chips";
import { TodayHighlight } from "@/components/today-highlight";
import { groupByNextBirthday } from "@/src/lib/contacts";
import { theme } from "@/constants/theme";
import { BirthdayItem } from "@/components/birthday-item";
import { EmptyState } from "@/components/empty-state";

export default function HomeScreen() {
  const [filtro, setFiltro] = useState<Filtro>("Hoje");
  const { lista, aniversarianteHoje, loading, err, reload } =
    useBirthdays(filtro);

  const sections = useMemo(() => groupByNextBirthday(lista), [lista]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ paddingHorizontal: theme.space.lg }}>
        <AppHeader />
        <FilterChips value={filtro} onChange={setFiltro} />
        {aniversarianteHoje ? (
          <TodayHighlight
            p={aniversarianteHoje}
            onPressCongrats={(p) => {
              /* abrir ação/whatsapp etc */
            }}
          />
        ) : null}
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.contact_id}
        contentContainerStyle={{
          paddingHorizontal: theme.space.lg,
          paddingBottom: 96,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ marginBottom: 8, marginTop: 12 }}>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#ECF3F1",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: theme.radius.pill,
              }}
            >
              <Text style={{ fontWeight: "800", color: theme.colors.fg }}>
                {title}
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => <BirthdayItem p={item} />}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: theme.space.lg }}>
            <EmptyState
              text={
                loading
                  ? "Carregando…"
                  : err ?? "Nenhum aniversário encontrado."
              }
            />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
      />
    </SafeAreaView>
  );
}

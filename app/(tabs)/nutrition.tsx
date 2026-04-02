import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import NutritionCard from '../../components/NutritionCard';
import { NUTRITION_MAP, PROBLEM_TO_NUTRITION_KEY } from '../../features/nutrition/nutritionMap';
import { Leaf } from 'lucide-react-native';

export default function NutritionScreen() {
  const { userContext, enabledNutritionCards, toggleNutritionCard } = useAppStore();

  // Build the list of relevant nutrition keys from the user's reported problems.
  // Fall back to showing all keys if no context is available.
  const relevantKeys = useMemo(() => {
    if (!userContext?.problems?.length) return Object.keys(NUTRITION_MAP);
    const keys = userContext.problems
      .map(p => PROBLEM_TO_NUTRITION_KEY[p])
      .filter(Boolean);
    // Show all cards if no problem maps to any key
    return keys.length > 0 ? [...new Set(keys)] : Object.keys(NUTRITION_MAP);
  }, [userContext]);

  const enabledCount = enabledNutritionCards.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Leaf size={28} color="#4CAF50" strokeWidth={2.5} />
            <Text style={styles.title}>Nutrition</Text>
          </View>
          <Text style={styles.subtitle}>
            Based on your reported issues. Toggle a card to add foods to your daily diet.
          </Text>
          {enabledCount > 0 && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>{enabledCount} protocol{enabledCount > 1 ? 's' : ''} active</Text>
            </View>
          )}
        </View>

        {relevantKeys.map(key => {
          const entry = NUTRITION_MAP[key];
          if (!entry) return null;
          return (
            <NutritionCard
              key={key}
              problemKey={key}
              label={entry.label}
              nutrients={entry.nutrients}
              foods={entry.foods}
              action={entry.action}
              enabled={enabledNutritionCards.includes(key)}
              onToggle={() => toggleNutritionCard(key)}
            />
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scroll: { padding: 24 },
  header: { marginBottom: 32 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginLeft: 12, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 22 },
  activeBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF5044',
  },
  activeBadgeText: { color: '#4CAF50', fontSize: 13, fontWeight: '700' },
});

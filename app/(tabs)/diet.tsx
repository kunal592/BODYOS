import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import DietItem from '../../components/DietItem';
import { dietMapToList } from '../../features/nutrition/nutritionService';
import { UtensilsCrossed, Salad } from 'lucide-react-native';

export default function DietScreen() {
  const { dietMap, consumedFoods, toggleFoodConsumed } = useAppStore();

  const foods = useMemo(() => dietMapToList(dietMap), [dietMap]);
  const consumedCount = foods.filter(f => consumedFoods.includes(f)).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Salad size={28} color="#f59e0b" strokeWidth={2.5} />
            <Text style={styles.title}>Daily Diet</Text>
          </View>
          <Text style={styles.subtitle}>Your dynamic food list. Toggle what you've eaten today.</Text>
        </View>

        {foods.length === 0 ? (
          <View style={styles.empty}>
            <UtensilsCrossed size={48} color="#222" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No foods yet</Text>
            <Text style={styles.emptyDesc}>
              Go to the Nutrition tab and enable cards based on your health goals. Your daily food list will build automatically.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>TODAY'S MEALS</Text>
              <Text style={styles.progressCount}>{consumedCount} / {foods.length}</Text>
            </View>

            {foods.map(food => (
              <DietItem
                key={food}
                food={food}
                consumed={consumedFoods.includes(food)}
                onToggle={() => toggleFoodConsumed(food)}
              />
            ))}
          </>
        )}

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
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  progressLabel: { fontSize: 11, fontWeight: '900', color: '#444', letterSpacing: 1.5 },
  progressCount: { fontSize: 24, fontWeight: '900', color: '#FFF' },
  empty: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 12 },
  emptyDesc: { color: '#444', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});

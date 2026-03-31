import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import HabitItem from '../../components/HabitItem';
import { Target, Activity, Calendar } from 'lucide-react-native';

export default function HabitsScreen() {
  const { userContext, habits, toggleHabit, progress } = useAppStore();

  if (!userContext) {
    return (
      <View style={styles.centered}>
        <Activity color="#FFF" size={32} />
        <Text style={styles.centeredText}>No Habits Found</Text>
      </View>
    );
  }

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Target size={28} color="#4CAF50" strokeWidth={3} />
            <Text style={styles.title}>Habit Engine</Text>
          </View>
          <Text style={styles.subtitle}>These define who you're becoming.</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Calendar size={20} color="#888" />
            <Text style={styles.statValue}>{progress.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#1A1A1A' }]}>
            <Activity size={20} color="#4CAF50" />
            <Text style={styles.statValue}>{completedCount}/{totalCount}</Text>
            <Text style={styles.statLabel}>Daily Goal</Text>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listLabel}>LIVE HABITS</Text>
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit.text}
              completed={habit.completed}
              onToggle={() => toggleHabit(habit.id)}
            />
          ))}
        </View>

        {habits.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No specialized habits in your current context.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scrollContent: { padding: 24, paddingBottom: 100 },
  header: { marginBottom: 32 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginLeft: 12, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#888', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  statBox: { 
    flex: 1, 
    backgroundColor: '#111', 
    padding: 20, 
    borderRadius: 24, 
    marginHorizontal: 6, 
    borderWidth: 1, 
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: { fontSize: 24, fontWeight: '900', color: '#FFF', marginVertical: 4 },
  statLabel: { fontSize: 12, color: '#555', fontWeight: 'bold', textTransform: 'uppercase' },
  listSection: { marginTop: 8 },
  listLabel: { fontSize: 12, color: '#333', fontWeight: '900', letterSpacing: 2, marginBottom: 16, paddingLeft: 8 },
  empty: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: '#444', fontSize: 14, textAlign: 'center' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' },
  centeredText: { marginTop: 16, color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

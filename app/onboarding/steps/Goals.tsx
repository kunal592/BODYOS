import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';

interface GoalsProps {
  onNext: (data: string[]) => void;
  onBack: () => void;
  initialData?: string[];
}

const Goals: React.FC<GoalsProps> = ({ onNext, onBack, initialData }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData || []);

  const goals = [
    'Gain weight', 'Lose fat', 'Build muscle', 'Improve posture',
    'Fix digestion', 'Increase energy', 'Improve sleep', 'Improve focus',
    'Hair health', 'Skin health'
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) {
      alert('Please select at least one goal');
      return;
    }
    onNext(selectedGoals);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={goals}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>What are your Goals?</Text>
            <Text style={styles.subtitle}>Select everything you want to achieve.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.goalItem, selectedGoals.includes(item) && styles.selectedGoal]}
            onPress={() => toggleGoal(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.goalText, selectedGoals.includes(item) && styles.selectedText]}>{item}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: { padding: 24, paddingBottom: 16 },
  listContent: { paddingHorizontal: 16, paddingBottom: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#AAA', marginBottom: 16 },
  goalItem: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 24,
    borderRadius: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  selectedGoal: { borderColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)', shadowColor: '#4CAF50', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  goalText: { color: '#EEE', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  selectedText: { color: '#4CAF50' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 16 },
  backButton: { flex: 1, padding: 18, borderRadius: 16, alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: '#333' },
  backButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  nextButton: { flex: 2, backgroundColor: '#FFF', padding: 18, borderRadius: 16, alignItems: 'center', marginLeft: 8 },
  nextButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});

export default Goals;

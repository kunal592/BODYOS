import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';

interface ProblemsProps {
  onNext: (data: string[]) => void;
  onBack: () => void;
  initialData?: string[];
}

const Problems: React.FC<ProblemsProps> = ({ onNext, onBack, initialData }) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>(initialData || []);

  const problems = [
    'Low energy', 'Hair fall', 'Weak digestion', 'Constipation',
    'Poor sleep', 'Back/neck pain', 'Bad posture', 'Brain fog',
    'Low appetite', 'Eye strain'
  ];

  const toggleProblem = (problem: string) => {
    if (selectedProblems.includes(problem)) {
      setSelectedProblems(selectedProblems.filter(p => p !== problem));
    } else {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleNext = () => {
    onNext(selectedProblems); // Problems can be zero (no problems)
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={problems}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>Current Issues</Text>
            <Text style={styles.subtitle}>Be honest with your body. Select what you're facing lately.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.problemItem, selectedProblems.includes(item) && styles.selectedProblem]}
            onPress={() => toggleProblem(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.problemText, selectedProblems.includes(item) && styles.selectedText]}>{item}</Text>
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
  problemItem: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  selectedProblem: { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', shadowColor: '#ef4444', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  problemText: { color: '#EEE', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  selectedText: { color: '#ef4444' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 16 },
  backButton: { flex: 1, padding: 18, borderRadius: 16, alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: '#333' },
  backButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  nextButton: { flex: 2, backgroundColor: '#FFF', padding: 18, borderRadius: 16, alignItems: 'center', marginLeft: 8 },
  nextButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});

export default Problems;

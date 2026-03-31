import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface LifestyleProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const Lifestyle: React.FC<LifestyleProps> = ({ onNext, onBack, initialData }) => {
  const [meals, setMeals] = useState(initialData?.meals || '3');
  const [water, setWater] = useState(initialData?.water || '1-2L');
  const [activity, setActivity] = useState(initialData?.activity || 'No exercise');
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());

  const mealOptions = ['1', '2', '3', '4+'];
  const waterOptions = ['<1L', '1-2L', '2-3L', '3L+'];
  const activityLevels = ['No exercise', 'Sometimes', 'Regular'];

  const handleNext = () => {
    onNext({
      meals,
      water,
      activity,
      sleepTime: sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      wakeTime: wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Lifestyle</Text>
      <Text style={styles.subtitle}>Your daily habits define your body state.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Meals per day</Text>
        <View style={styles.optionsContainer}>
          {mealOptions.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.optionButton, meals === m && styles.selectedOption]}
              onPress={() => setMeals(m)}
            >
              <Text style={[styles.optionText, meals === m && styles.selectedText]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Water intake</Text>
        <View style={styles.optionsContainer}>
          {waterOptions.map((w) => (
            <TouchableOpacity
              key={w}
              style={[styles.optionButton, water === w && styles.selectedOption]}
              onPress={() => setWater(w)}
            >
              <Text style={[styles.optionText, water === w && styles.selectedText]}>{w}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity level</Text>
        <View style={styles.activityContainer}>
          {activityLevels.map((a) => (
            <TouchableOpacity
              key={a}
              style={[styles.activityButton, activity === a && styles.selectedActivity]}
              onPress={() => setActivity(a)}
            >
              <Text style={[styles.optionText, activity === a && styles.selectedActivityText]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Sleep Time</Text>
          <DateTimePicker
            value={sleepTime}
            mode="time"
            display="default"
            themeVariant="dark"
            onChange={(event: any, date?: Date) => date && setSleepTime(date)}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Wake Time</Text>
          <DateTimePicker
            value={wakeTime}
            mode="time"
            display="default"
            themeVariant="dark"
            onChange={(event: any, date?: Date) => date && setWakeTime(date)}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#AAA', marginBottom: 32 },
  inputGroup: { marginBottom: 32 },
  label: { fontSize: 14, fontWeight: '600', color: '#888', marginBottom: 12, textTransform: 'uppercase' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  optionButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  selectedOption: { borderColor: '#FFF', backgroundColor: '#333' },
  optionText: { color: '#888', fontWeight: 'bold', fontSize: 14 },
  selectedText: { color: '#FFF' },
  activityContainer: { flexDirection: 'column' },
  activityButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedActivity: { borderColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)' },
  selectedActivityText: { color: '#4CAF50' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  backButton: { flex: 1, padding: 18, borderRadius: 16, alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: '#333' },
  backButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  nextButton: { flex: 2, backgroundColor: '#FFF', padding: 18, borderRadius: 16, alignItems: 'center', marginLeft: 8 },
  nextButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});

export default Lifestyle;

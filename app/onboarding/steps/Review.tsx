import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Clipboard, Platform } from 'react-native';
import { generatePrompt } from '../../../features/context/contextService';

interface ReviewProps {
  onBack: () => void;
  onFinish: (json: string) => void;
  userData: any;
}

const Review: React.FC<ReviewProps> = ({ onBack, onFinish, userData }) => {
  const [prompt, setPrompt] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [step, setStep] = useState(1); // 1: generate prompt, 2: input json

  const handleGenerate = () => {
    const generatedStr = generatePrompt(userData);
    setPrompt(generatedStr);
    setStep(1.5); // transition state to show prompt
  };

  const copyToClipboard = () => {
    Clipboard.setString(prompt);
    Alert.alert('Copied!', 'The prompt has been copied to your clipboard. Paste it into ChatGPT to get your health protocol.');
    setStep(2); // move to next step to input JSON
  };

  const handleJsonSubmit = () => {
    if (!jsonInput.trim()) {
      Alert.alert('Error', 'Please paste the JSON response from ChatGPT.');
      return;
    }
    onFinish(jsonInput);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Final Step</Text>
      <Text style={styles.subtitle}>Review your data and generate your personalized plan.</Text>

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Summary</Text>
          <Text style={styles.cardText}>Age: {userData.basicInfo.age}</Text>
          <Text style={styles.cardText}>Gender: {userData.basicInfo.gender}</Text>
          <Text style={styles.cardText}>Goals: {userData.goals.join(', ')}</Text>
          <Text style={styles.cardText}>Issues: {userData.problems.join(', ')}</Text>
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleGenerate}>
            <Text style={styles.primaryButtonText}>Generate Plan Prompt</Text>
          </TouchableOpacity>
        </View>
      )}

      {(step === 1.5 || step === 2) && prompt !== '' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your AI Prompt</Text>
          <Text style={styles.cardSubtitle}>Copy this and paste it into ChatGPT.</Text>
          <ScrollView style={styles.promptBox}>
            <Text style={styles.promptText}>{prompt}</Text>
          </ScrollView>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#4CAF50' }]} onPress={copyToClipboard}>
            <Text style={styles.primaryButtonText}>Copy to Clipboard</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Paste Response</Text>
          <Text style={styles.cardSubtitle}>Paste the JSON protocol from ChatGPT below.</Text>
          <TextInput
            style={styles.jsonInput}
            placeholder='{"userProfile": ...}'
            placeholderTextColor="#555"
            multiline
            value={jsonInput}
            onChangeText={setJsonInput}
          />
          <TouchableOpacity style={styles.finishButton} onPress={handleJsonSubmit}>
            <Text style={styles.finishButtonText}>Finalize Plan</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
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
  card: { backgroundColor: '#111', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#222' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: '#AAA', marginBottom: 16 },
  cardText: { fontSize: 14, color: '#CCC', marginBottom: 4 },
  promptBox: { backgroundColor: '#050505', padding: 16, borderRadius: 12, height: 200, marginBottom: 16, borderWidth: 1, borderColor: '#333' },
  promptText: { color: '#888', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  jsonInput: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, color: '#4CAF50', fontSize: 12, height: 150, textAlignVertical: 'top', borderWidth: 1, borderColor: '#333', marginBottom: 16, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  primaryButton: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 16 },
  primaryButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  finishButton: { backgroundColor: '#FFF', padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 16, shadowColor: '#FFF', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  finishButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  footer: { marginTop: 16 },
  backButton: { padding: 16, alignItems: 'center' },
  backButtonText: { color: '#888', fontSize: 16, fontWeight: '600' },
});

export default Review;

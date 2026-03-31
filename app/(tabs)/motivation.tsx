import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Share, Alert, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { getDailyQuote } from '../../features/motivation/quoteService';
import { Sparkles, Share2, Award, Gift } from 'lucide-react-native';

export default function MotivationScreen() {
  const { progress } = useAppStore();
  const [quote, setQuote] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setQuote(getDailyQuote());
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quote}" - My daily boost from HealthOS. Current streak: ${progress.streak} days.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share right now.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Boost</Text>
          <Text style={styles.subtitle}>Unlock your daily reward.</Text>
        </View>

        {!unlocked ? (
          <View style={styles.unlockedBox}>
            <View style={styles.giftIcon}>
              <Gift size={80} color="#FFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.unlockedTitle}>Mystery Boost</Text>
            <Text style={styles.unlockedDesc}>Your daily motivational card is ready.</Text>
            <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
              <Text style={styles.unlockButtonText}>REVEAL</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.quoteCard}>
            <Sparkles size={32} color="#FFF" style={{ marginBottom: 20 }} />
            <Text style={styles.quoteText}>"{quote}"</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardApp}>HEALTHOS</Text>
                <Text style={styles.cardTagline}>Your body, but with a system.</Text>
              </View>
              <Award size={24} color="#555" />
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 size={20} color="#FFF" />
                <Text style={styles.actionText}>Share Story</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {unlocked && (
          <View style={styles.streakBox}>
            <Text style={styles.streakLabel}>STREAK STATUS</Text>
            <Text style={styles.streakValue}>{progress.streak} DAYS</Text>
            <Text style={styles.streakDesc}>Come back tomorrow for your next boost.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scroll: { padding: 24, paddingBottom: 100 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 16, color: '#888', marginTop: 4 },
  unlockedBox: { backgroundColor: '#111', padding: 40, borderRadius: 32, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  giftIcon: { marginBottom: 24 },
  unlockedTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  unlockedDesc: { color: '#555', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  unlockButton: { backgroundColor: '#FFF', paddingHorizontal: 50, paddingVertical: 18, borderRadius: 20 },
  unlockButtonText: { color: '#000', fontWeight: '900', fontSize: 16 },
  quoteCard: { backgroundColor: '#1A1A1A', padding: 32, borderRadius: 32, borderWidth: 1, borderColor: '#333', minHeight: 400, justifyContent: 'center', alignItems: 'center' },
  quoteText: { fontSize: 28, fontWeight: 'bold', color: '#FFF', textAlign: 'center', lineHeight: 40, fontStyle: 'italic', marginBottom: 40 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', borderTopWidth: 1, borderTopColor: '#333', paddingTop: 20 },
  cardApp: { color: '#FFF', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  cardTagline: { color: '#444', fontSize: 10, fontWeight: 'bold', marginTop: 2 },
  actions: { marginTop: 40, flexDirection: 'row', justifyContent: 'center' },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
  actionText: { color: '#FFF', fontWeight: 'bold', marginLeft: 12 },
  streakBox: { marginTop: 40, alignItems: 'center' },
  streakLabel: { color: '#333', fontWeight: '900', letterSpacing: 2, fontSize: 12, marginBottom: 8 },
  streakValue: { color: '#FFF', fontSize: 40, fontWeight: '900' },
  streakDesc: { color: '#555', fontSize: 14, marginTop: 8 },
});

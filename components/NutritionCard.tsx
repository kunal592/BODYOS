import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Zap } from 'lucide-react-native';

interface NutritionCardProps {
  problemKey: string;
  label: string;
  nutrients: string[];
  foods: string[];
  action: string;
  enabled: boolean;
  onToggle: () => void;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  label, nutrients, foods, action, enabled, onToggle
}) => {
  return (
    <View style={[styles.card, enabled && styles.cardEnabled]}>
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: '#222', true: '#4CAF50' }}
          thumbColor={enabled ? '#FFF' : '#555'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>KEY NUTRIENTS</Text>
        <View style={styles.pillRow}>
          {nutrients.map(n => (
            <View key={n} style={styles.pill}>
              <Text style={styles.pillText}>{n}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>FOODS TO EAT</Text>
        <View style={styles.pillRow}>
          {foods.map(f => (
            <View key={f} style={[styles.pill, styles.foodPill, enabled && styles.foodPillActive]}>
              <Text style={[styles.pillText, enabled && styles.foodPillTextActive]}>{f}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionRow}>
        <Zap size={14} color={enabled ? '#4CAF50' : '#555'} />
        <Text style={[styles.actionText, enabled && styles.actionTextActive]}>{action}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardEnabled: {
    borderColor: '#4CAF5033',
    backgroundColor: '#0f1a0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  section: { marginBottom: 16 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#444',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap' },
  pill: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  pillText: { color: '#888', fontSize: 12, fontWeight: '600' },
  foodPill: { backgroundColor: '#1A1A1A' },
  foodPillActive: { backgroundColor: 'rgba(76,175,80,0.08)', borderColor: '#4CAF5066' },
  foodPillTextActive: { color: '#4CAF50' },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  actionText: { color: '#555', fontSize: 13, marginLeft: 8, fontStyle: 'italic', flex: 1 },
  actionTextActive: { color: '#4CAF50' },
});

export default NutritionCard;

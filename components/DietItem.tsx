import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';

interface DietItemProps {
  food: string;
  consumed: boolean;
  onToggle: () => void;
}

const DietItem: React.FC<DietItemProps> = ({ food, consumed, onToggle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      {consumed
        ? <CheckCircle2 size={24} color="#4CAF50" strokeWidth={2.5} />
        : <Circle size={24} color="#333" strokeWidth={2} />
      }
      <Text style={[styles.foodText, consumed && styles.consumedText]}>{food}</Text>
      {consumed && <View style={styles.badge}><Text style={styles.badgeText}>Eaten</Text></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  foodText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 16,
    flex: 1,
  },
  consumedText: { color: '#4CAF50', opacity: 0.6, textDecorationLine: 'line-through' },
  badge: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF5033',
  },
  badgeText: { color: '#4CAF50', fontSize: 11, fontWeight: '900' },
});

export default DietItem;

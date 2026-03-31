import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';

interface HabitItemProps {
  habit: string;
  completed: boolean;
  onToggle: () => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, completed, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, completed && styles.completedContainer]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {completed ? (
          <CheckCircle2 size={24} color="#4CAF50" strokeWidth={2.5} />
        ) : (
          <Circle size={24} color="#444" strokeWidth={2} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, completed && styles.completedText]}>
          {habit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  completedContainer: {
    borderColor: '#4CAF5033',
    backgroundColor: '#111',
  },
  iconContainer: { marginRight: 16 },
  textContainer: { flex: 1 },
  text: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  completedText: {
    color: '#4CAF50',
    opacity: 0.6,
  },
});

export default HabitItem;

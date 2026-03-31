import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface TaskCardProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, completed, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, completed && styles.completedContainer]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, completed && styles.checkedBox]}>
        {completed && <Check size={16} color="#000" strokeWidth={3} />}
      </View>
      <Text style={[styles.text, completed && styles.completedText]}>
        {task}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  completedContainer: {
    backgroundColor: '#0A0A0A',
    borderColor: '#1A1A1A',
    opacity: 0.8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#444',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  text: {
    fontSize: 16,
    color: '#EEE',
    fontWeight: '500',
    flex: 1,
  },
  completedText: {
    color: '#555',
    textDecorationLine: 'line-through',
  },
});

export default TaskCard;

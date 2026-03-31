import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import ProgressBar from '../../components/ProgressBar';
import TaskCard from '../../components/TaskCard';
import { Coffee, Sun, Sunset, Moon, Activity } from 'lucide-react-native';

const SectionHeader = ({ icon: Icon, title, count, total }: { icon: any, title: string, count: number, total: number }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionTitleRow}>
      <Icon size={20} color="#888" style={{ marginRight: 8 }} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Text style={styles.sectionCount}>{count}/{total}</Text>
  </View>
);

export default function DashboardScreen() {
  const { userContext, tasks, progress, toggleTask } = useAppStore();

  if (!userContext) {
    return (
      <View style={styles.centered}>
        <Activity color="#FFF" size={32} />
        <Text style={styles.centeredText}>No Protocol Found</Text>
      </View>
    );
  }

  const sections = useMemo(() => [
    { key: 'morning', title: 'Morning Rise', icon: Coffee, data: tasks.morning },
    { key: 'afternoon', title: 'Focus Afternoon', icon: Sun, data: tasks.afternoon },
    { key: 'evening', title: 'Wind Down', icon: Sunset, data: tasks.evening },
    { key: 'night', title: 'Deep Reset', icon: Moon, data: tasks.night },
  ], [tasks]);

  const handleToggle = (section: string, id: string) => {
    toggleTask(section as any, id);
  };

  const getStats = () => {
    if (progress.completion >= 100) return "Masterfully Completed!";
    if (progress.completion >= 70) return "You're deep in the flow.";
    if (progress.completion >= 30) return "Momentum is building.";
    return "The system is waiting for your first move.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[1]} style={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Body Optimization</Text>
          <Text style={styles.subWelcome}>Protocol for {userContext.userProfile.gender}</Text>
        </View>

        <View style={styles.stickyBar}>
          <ProgressBar progress={progress.completion} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.streakLabel}>CURRENT STREAK</Text>
          <Text style={styles.streakValue}>{progress.streak} days</Text>
          <Text style={styles.summaryText}>{getStats()}</Text>
        </View>

        {sections.map((section) => {
          if (section.data.length === 0) return null;
          
          const completedCount = section.data.filter(t => t.completed).length;
          
          return (
            <View key={section.key} style={styles.section}>
              <SectionHeader 
                icon={section.icon} 
                title={section.title} 
                count={completedCount} 
                total={section.data.length} 
              />
              {section.data.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task.text} 
                  completed={task.completed} 
                  onToggle={() => handleToggle(section.key, task.id)} 
                />
              ))}
            </View>
          );
        })}
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scroll: { flex: 1 },
  header: { padding: 24, paddingTop: 40 },
  welcome: { fontSize: 34, fontWeight: 'bold', color: '#FFF', letterSpacing: -1 },
  subWelcome: { fontSize: 16, color: '#888', marginTop: 4 },
  stickyBar: { backgroundColor: '#0A0A0A', borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  summaryBox: { backgroundColor: '#111', margin: 24, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#222' },
  streakLabel: { fontSize: 12, fontWeight: 'bold', color: '#888', letterSpacing: 1.5, marginBottom: 4 },
  streakValue: { fontSize: 32, fontWeight: '900', color: '#FFF', marginBottom: 8 },
  summaryText: { fontSize: 14, color: '#BBB', fontWeight: '500' },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#EEE' },
  sectionCount: { fontSize: 14, color: '#444', fontWeight: 'bold' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' },
  centeredText: { marginTop: 16, color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

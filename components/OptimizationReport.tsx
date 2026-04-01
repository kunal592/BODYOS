import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Activity, Award, AlertCircle } from 'lucide-react-native';
import { WeeklyInsight } from '../features/progress/reportService';

interface OptimizationReportProps {
  insights: WeeklyInsight[];
}

const OptimizationReport: React.FC<OptimizationReportProps> = ({ insights }) => {
  if (insights.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Activity size={32} color="#444" />
        <Text style={styles.emptyText}>Building your optimization baseline. Check back tomorrow.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Retro Report</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {insights.map((insight, index) => {
          const Icon = insight.type === 'improvement' ? TrendingUp : (insight.type === 'consistency' ? Award : AlertCircle);
          const color = insight.type === 'improvement' ? '#4CAF50' : (insight.type === 'consistency' ? '#f59e0b' : '#ef4444');

          return (
            <View key={index} style={[styles.card, { borderColor: color + '22' }]}>
              <View style={[styles.iconBox, { backgroundColor: color + '11' }]}>
                <Icon size={20} color={color} />
              </View>
              <Text style={styles.cardTitle}>{insight.title}</Text>
              <Text style={styles.cardDesc}>{insight.description}</Text>
              <View style={styles.impactRow}>
                <View style={[styles.pill, { backgroundColor: color + '11' }]}>
                  <Text style={[styles.pillText, { color }]}>+{Math.round(insight.impact)}% Impact</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 32 },
  title: { fontSize: 12, fontWeight: '900', color: '#555', letterSpacing: 2, marginBottom: 16, paddingLeft: 8, textTransform: 'uppercase' },
  scroll: { paddingBottom: 16 },
  card: { backgroundColor: '#111', width: 260, padding: 24, borderRadius: 32, marginRight: 16, borderWidth: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#888', lineHeight: 20, marginBottom: 16 },
  impactRow: { flexDirection: 'row' },
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  pillText: { fontSize: 11, fontWeight: '900' },
  emptyContainer: { padding: 40, alignItems: 'center', backgroundColor: '#111', borderRadius: 32, borderStyle: 'dashed', borderWidth: 1, borderColor: '#333' },
  emptyText: { color: '#555', fontSize: 14, textAlign: 'center', marginTop: 12, lineHeight: 20 },
});

export default OptimizationReport;

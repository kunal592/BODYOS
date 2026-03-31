import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import BodyMap from '../../components/BodyMap';
import { Info, XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react-native';

export default function BodyStatusScreen() {
  const { userContext } = useAppStore();
  const [selectedPart, setSelectedPart] = useState<{ id: string, name: string } | null>(null);

  if (!userContext) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>Complete onboarding to see your body status.</Text>
      </View>
    );
  }

  const handlePartPress = (id: string, name: string) => {
    setSelectedPart({ id, name });
  };

  const getPartStatusInfo = (id: string) => {
    const status = (userContext.bodyState as any)[id];
    switch (status) {
      case 'bad':
        return {
          icon: XCircle,
          color: '#ef4444',
          label: 'CRITICAL',
          desc: 'This area needs immediate attention and consistent habits.'
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          color: '#f59e0b',
          label: 'MODERATE',
          desc: 'Improving but still has some symptoms. Stay consistent.'
        };
      case 'good':
        return {
          icon: CheckCircle2,
          color: '#22c55e',
          label: 'OPTIMAL',
          desc: 'Maintaining good health in this region. Great job!'
        };
      default:
        return {
          icon: Info,
          color: '#888',
          label: 'UNKNOWN',
          desc: 'No data available for this region.'
        };
    }
  };

  const currentInfo = selectedPart ? getPartStatusInfo(selectedPart.id) : null;
  const CurrentIcon = currentInfo?.icon;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Visual Health</Text>
          <Text style={styles.subtitle}>Current body status based on reports.</Text>
        </View>

        <View style={styles.bodyContainer}>
          <BodyMap bodyState={userContext.bodyState as any} onPartPress={handlePartPress} />
          
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>Critical</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
              <Text style={styles.legendText}>Moderate</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
              <Text style={styles.legendText}>Healthy</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>HOW TO IMPROVE?</Text>
          <Text style={styles.infoText}>
            The system maps your daily habits and tasks to specific body regions. 
            Consistency in your daily protocol will shift colors from Red to Green.
          </Text>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedPart}
          onRequestClose={() => setSelectedPart(null)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setSelectedPart(null)}
          >
            <View style={styles.modalContent}>
              {selectedPart && currentInfo && CurrentIcon && (
                <>
                  <Text style={styles.modalPartName}>{selectedPart.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: currentInfo.color + '22', borderColor: currentInfo.color }]}>
                    <CurrentIcon size={16} color={currentInfo.color} strokeWidth={3} />
                    <Text style={[styles.statusLabel, { color: currentInfo.color }]}>{currentInfo.label}</Text>
                  </View>
                  <Text style={styles.modalDesc}>{currentInfo.desc}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => setSelectedPart(null)}
                  >
                    <Text style={styles.closeButtonText}>Done</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
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
  bodyContainer: { alignItems: 'center', marginBottom: 40 },
  legend: { flexDirection: 'row', marginTop: 24, justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  legendText: { color: '#888', fontSize: 12, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#111', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#222' },
  infoTitle: { fontSize: 12, fontWeight: 'bold', color: '#888', letterSpacing: 1.5, marginBottom: 8 },
  infoText: { fontSize: 14, color: '#CCC', lineHeight: 22 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#1A1A1A', padding: 32, borderRadius: 32, width: '80%', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  modalPartName: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 12 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  statusLabel: { fontSize: 12, fontWeight: '900', marginLeft: 8 },
  modalDesc: { fontSize: 16, color: '#888', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  closeButton: { backgroundColor: '#FFF', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 16 },
  closeButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' },
  centeredText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 40 },
});

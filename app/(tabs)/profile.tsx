import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { User, Settings, LogOut, ChevronRight, Bell, Shield, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { userContext, resetDaily } = useAppStore();
  const router = useRouter();

  const handleReset = () => {
    Alert.alert(
      "Reset Protocol",
      "This will clear your daily protocol but keep your history. This is normally done automatically at midnight.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset Daily", style: "destructive", onPress: resetDaily }
      ]
    );
  };

  if (!userContext) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <User size={40} color="#FFF" />
          </View>
          <Text style={styles.userName}>{userContext.userProfile.gender} Profile</Text>
          <Text style={styles.userMeta}>{userContext.userProfile.age} yrs • {userContext.userProfile.weight}kg • {userContext.userProfile.height}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <Bell size={20} color="#555" />
              <Text style={styles.rowText}>Reminders</Text>
            </View>
            <ChevronRight size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <Shield size={20} color="#555" />
              <Text style={styles.rowText}>Privacy & Safety</Text>
            </View>
            <ChevronRight size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SYSTEM</Text>
          <TouchableOpacity style={styles.row} onPress={handleReset}>
            <View style={styles.rowLeft}>
              <Settings size={20} color="#555" />
              <Text style={styles.rowText}>Daily Protocol Reset</Text>
            </View>
            <ChevronRight size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <Info size={20} color="#555" />
              <Text style={styles.rowText}>About HealthOS</Text>
            </View>
            <ChevronRight size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => {
            Alert.alert("Warning", "This will clear all your data. Proceed?", [
              { text: "Cancel", style: "cancel" },
              { text: "Wipe Data", style: "destructive", onPress: () => {
                // In a real app we'd clear local storage and reset state
                router.replace('/onboarding');
              }}
            ]);
          }}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Wipe App Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scroll: { padding: 24, paddingBottom: 100 },
  header: { alignItems: 'center', marginVertical: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#333' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  userMeta: { fontSize: 14, color: '#555', marginTop: 4 },
  section: { marginTop: 32 },
  sectionLabel: { fontSize: 12, fontWeight: '900', color: '#333', letterSpacing: 2, marginBottom: 16, paddingLeft: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: 18, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: '#222' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { color: '#CCC', fontSize: 16, marginLeft: 16, fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 60, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#ef444433', backgroundColor: 'rgba(239,68,68,0.05)' },
  logoutText: { color: '#ef4444', fontWeight: 'bold', marginLeft: 12, fontSize: 16 },
});

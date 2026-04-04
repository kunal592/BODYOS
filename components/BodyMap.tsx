import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { BodyStatus } from '../store/useAppStore';

interface BodyPartProps {
  id: string;
  name: string;
  status: BodyStatus;
  d: string;
  nerves: string;
  onPress: (id: string, name: string) => void;
}

const BodyPart: React.FC<BodyPartProps> = ({ 
  id, name, status, d, nerves, onPress 
}) => {
  const getColor = (s: BodyStatus) => {
    switch (s) {
      case 'bad': return '#ef4444'; // Red
      case 'moderate': return '#f59e0b'; // Amber
      case 'good': return '#22c55e'; // Green
      default: return '#333';
    }
  };

  const getGlowColor = (s: BodyStatus) => {
    switch (s) {
      case 'bad': return '#ffd6d6'; 
      case 'moderate': return '#ffeacc'; 
      case 'good': return '#d6ffd6'; 
      default: return '#555';
    }
  };

  return (
    <G onPress={() => onPress(id, name)}>
      {/* Muscle Silhouette */}
      <Path
        d={d}
        fill={getColor(status)}
        stroke="#111"
        strokeWidth="3"
      />
      {/* Nervous System Glow */}
      <Path
        d={nerves}
        fill="none"
        stroke={getGlowColor(status)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </G>
  );
};

interface BodyMapProps {
  bodyState: Record<string, BodyStatus>;
  onPartPress: (id: string, name: string) => void;
}

const BodyMap: React.FC<BodyMapProps> = ({ bodyState, onPartPress }) => {
  return (
    <View style={styles.container}>
      <Svg height="450" width="250" viewBox="0 0 250 450">
        
        {/* Head & Brain */}
        <BodyPart 
          id="head" name="Brain & Head" status={bodyState.head} 
          d="M 125 10 C 145 10 145 35 145 45 C 145 65 135 70 125 70 C 115 70 105 65 105 45 C 105 35 105 10 125 10 Z"
          nerves="M 125 15 L 125 70 M 125 25 Q 115 30 110 40 M 125 25 Q 135 30 140 40 M 125 45 Q 115 50 110 55 M 125 45 Q 135 50 140 55"
          onPress={onPartPress} 
        />
        
        {/* Cervical Nerves (Neck) */}
        <BodyPart 
          id="neck" name="Neck" status={bodyState.neck} 
          d="M 115 68 L 135 68 L 140 90 L 110 90 Z"
          nerves="M 125 68 L 125 90 M 120 75 L 115 80 M 130 75 L 135 80"
          onPress={onPartPress} 
        />

        {/* Thoracic Spinal & Muscular (Upper Body & Back) */}
        <BodyPart 
          id="back" name="Upper Body & Back" status={bodyState.back} 
          d="M 110 90 C 80 90 55 110 55 130 C 55 150 75 160 85 180 C 90 190 95 220 95 220 L 155 220 C 155 220 160 190 165 180 C 175 160 195 150 195 130 C 195 110 170 90 140 90 Z"
          nerves="M 125 90 L 125 220 M 125 100 Q 90 110 65 130 M 125 100 Q 160 110 185 130 M 125 130 Q 100 140 80 160 M 125 130 Q 150 140 170 160 M 125 160 Q 110 170 90 190 M 125 160 Q 140 170 160 190 M 125 190 Q 115 200 100 210 M 125 190 Q 135 200 150 210"
          onPress={onPartPress} 
        />

        {/* Lumbar & Core (Gut / Digestion) */}
        <BodyPart 
          id="gut" name="Gut & Digestion" status={bodyState.gut} 
          d="M 95 220 C 95 250 85 270 85 290 C 85 300 125 310 125 310 C 125 310 165 300 165 290 C 165 270 155 250 155 220 Z"
          nerves="M 125 220 L 125 310 M 125 240 Q 105 245 95 260 M 125 240 Q 145 245 155 260 M 125 270 Q 115 280 90 285 M 125 270 Q 135 280 160 285"
          onPress={onPartPress} 
        />

        {/* Sciatic & Lower Extremities (Legs) */}
        <BodyPart 
          id="legs" name="Lower Extremities" status={bodyState.legs} 
          d="M 85 290 C 70 320 70 360 80 390 C 85 410 85 430 80 440 L 115 440 C 110 420 110 390 115 360 C 120 330 125 310 125 310 Z M 165 290 C 180 320 180 360 170 390 C 165 410 165 430 170 440 L 135 440 C 140 420 140 390 135 360 C 130 330 125 310 125 310 Z"
          nerves="M 105 290 Q 85 350 95 440 M 105 320 Q 90 340 80 350 M 100 370 Q 110 380 110 400 M 145 290 Q 165 350 155 440 M 145 320 Q 160 340 170 350 M 150 370 Q 140 380 140 400"
          onPress={onPartPress} 
        />

      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0A0A0A',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
});

export default BodyMap;

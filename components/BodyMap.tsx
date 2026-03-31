import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Svg, { Circle, Rect, G } from 'react-native-svg';
import { BodyStatus } from '../store/useAppStore';

interface BodyPartProps {
  id: string;
  name: string;
  status: BodyStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  isCircle?: boolean;
  onPress: (id: string, name: string) => void;
}

const BodyPart: React.FC<BodyPartProps> = ({ 
  id, name, status, x, y, width, height, rx = 8, isCircle = false, onPress 
}) => {
  const getColor = (s: BodyStatus) => {
    switch (s) {
      case 'bad': return '#ef4444';
      case 'moderate': return '#f59e0b';
      case 'good': return '#22c55e';
      default: return '#333';
    }
  };

  return (
    <G onPress={() => onPress(id, name)}>
      {isCircle ? (
        <Circle
          cx={x + width / 2}
          cy={y + height / 2}
          r={width / 2}
          fill={getColor(status)}
          stroke="#000"
          strokeWidth="2"
        />
      ) : (
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          fill={getColor(status)}
          stroke="#000"
          strokeWidth="2"
        />
      )}
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
        {/* Head */}
        <BodyPart 
          id="head" name="Brain & Head" status={bodyState.head} 
          x={100} y={10} width={50} height={50} isCircle={true}
          onPress={onPartPress} 
        />
        
        {/* Neck */}
        <BodyPart 
          id="neck" name="Neck" status={bodyState.neck} 
          x={115} y={65} width={20} height={20}
          onPress={onPartPress} 
        />

        {/* Torso / Back */}
        <BodyPart 
          id="back" name="Upper Body & Back" status={bodyState.back} 
          x={85} y={90} width={80} height={100} rx={12}
          onPress={onPartPress} 
        />

        {/* Gut / Digestion */}
        <BodyPart 
          id="gut" name="Gut & Digestion" status={bodyState.gut} 
          x={90} y={200} width={70} height={70} rx={15}
          onPress={onPartPress} 
        />

        {/* Legs */}
        <G>
          <BodyPart 
            id="legs" name="Lower Body (Left)" status={bodyState.legs} 
            x={85} y={280} width={35} height={150} rx={10}
            onPress={onPartPress} 
          />
          <BodyPart 
            id="legs" name="Lower Body (Right)" status={bodyState.legs} 
            x={130} y={280} width={35} height={150} rx={10}
            onPress={onPartPress} 
          />
        </G>
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

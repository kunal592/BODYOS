import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { parseContext } from '../../features/context/contextService';

// Steps
import BasicInfo from './steps/BasicInfo';
import Goals from './steps/Goals';
import Problems from './steps/Problems';
import Lifestyle from './steps/Lifestyle';
import Review from './steps/Review';

const Onboarding = () => {
  const router = useRouter();
  const setContext = useAppStore((state) => state.setContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    basicInfo: {},
    goals: [],
    problems: [],
    lifestyle: {},
  });

  const nextStep = (data: any, key: string) => {
    setUserData((prev) => ({ ...prev, [key]: data }));
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (json: string) => {
    try {
      const validatedContext = parseContext(json);
      setContext(validatedContext);
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Invalid Format', 'The JSON plan pasted is not in the correct format. Make sure you copied exactly what the AI returned.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo onNext={(data) => nextStep(data, 'basicInfo')} />;
      case 2:
        return <Goals onNext={(data) => nextStep(data, 'goals')} onBack={prevStep} />;
      case 3:
        return <Problems onNext={(data) => nextStep(data, 'problems')} onBack={prevStep} />;
      case 4:
        return <Lifestyle onNext={(data) => nextStep(data, 'lifestyle')} onBack={prevStep} />;
      case 5:
        return <Review onBack={prevStep} onFinish={handleJsonSubmit} userData={userData} />;
      default:
        return <BasicInfo onNext={(data) => nextStep(data, 'basicInfo')} />;
    }
  };

  // Wait, I messed up the onFinish function call in Review. It's called onFinish.
  const handleJsonSubmit = (json: string) => {
    handleFinish(json);
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
});

export default Onboarding;

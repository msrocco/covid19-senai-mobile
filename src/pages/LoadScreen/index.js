import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/images/logo.png';

export default function LoadScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const { navigate } = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigate('BottomTabs');
    }, 500);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={logoImg} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0373ab',
  },
});

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Predictions() {
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20,
          marginTop: 50,
        }}
      >
        <Text>Tela de previões</Text>
      </View>
    </ScrollView>
  );
}

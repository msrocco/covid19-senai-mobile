import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Predictions() {
  return (
    <>
      <View style={{ backgroundColor: '#f5f6fa', flex: 0, height: 40 }}>
        <StatusBar
          backgroundColor="#f5f6fa"
          translucent={false}
          hidden={false}
          style="dark"
        />
      </View>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            marginTop: 0,
          }}
        >
          <Text>Tela de previões</Text>
        </View>
      </ScrollView>
    </>
  );
}

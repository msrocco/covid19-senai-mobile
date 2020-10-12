import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Feather as Icon } from '@expo/vector-icons';

export default function Feelings() {
  const [item, setItem] = useState(null);

  return (
    <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
      <View style={styles.container}>
        <RNPickerSelect
          placeholder={{ label: 'Selecione um tópico' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
          style={pickerSelect}
          onValueChange={(value) => setItem(value)}
          items={[
            { label: 'Covid-19', value: 1 },
            { label: 'Coronavírus', value: 2 },
            { label: 'Isolamento Social', value: 3 },
            { label: 'Pandemia', value: 4 },
          ]}
        />
        <Text>Tela de análise de sentimentos</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 50,
  },
});

const pickerSelect = StyleSheet.create({
  placeholder: {
    fontSize: 18,
    color: '#6C6C80',
  },
  inputIOS: {
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  viewContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  iconContainer: {
    padding: 20,
  },
});

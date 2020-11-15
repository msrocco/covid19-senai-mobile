import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

export default function Select({items, onValueChange}) {
  return (
    <RNPickerSelect
      placeholder={{}}
      Icon={() => <Feather name="chevron-down" size={20} color="#6C6C80" />}
      style={pickerSelect}
      onValueChange={onValueChange}
      items={items}
      useNativeAndroidPickerStyle
      fixAndroidTouchableBug
    />
  );
}

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
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Nunito_600SemiBold',
  },
  viewContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    margin: 20,
    marginTop: 12,
  },
  iconContainer: {
    padding: 20,
  },
});

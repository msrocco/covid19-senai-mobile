import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PageHeader({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: '500',
  }
});

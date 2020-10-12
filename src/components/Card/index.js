import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import formatValue from '../../utils/formatValue';

export default function Card({ title, amountCountry, amountState }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18 }}>{title}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#6c757d'}}>Paraná</Text>
          <Text style={styles.cardAmount}>{formatValue(amountState)}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#6c757d'}}>Brasil</Text>
          <Text style={styles.cardAmount}>{formatValue(amountCountry)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },

  title: {
    alignItems: 'center',
    marginBottom: 10,
  },

  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  cardAmount: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 2,
  },
});

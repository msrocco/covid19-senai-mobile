import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card({ title, amount }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardInfo}>
        <Text>
          {title}
        </Text>
        <Text style={styles.cardAmount}>
          {amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    marginTop: 20,
    borderWidth: .5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },

  cardInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  cardAmount: {
    fontSize: 24,
    fontWeight: '500'
  }

});
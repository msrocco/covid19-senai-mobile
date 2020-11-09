import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import paranaFlag from '../../assets/images/parana.png';
import brasilFlag from '../../assets/images/brasil.png';

export default function Card({ title, amountCountry, amountState }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, color: '#1d253b', fontFamily: 'Nunito_600SemiBold' }}>{title}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={brasilFlag} style={styles.image} />
          <Text style={styles.cardAmount}>{amountCountry}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={paranaFlag} style={styles.image} />
          <Text style={styles.cardAmount}>{amountState}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    marginTop: 11,    
    borderRadius: 10,
    justifyContent: 'center',    
    backgroundColor: '#fff',
  },

  title: {
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'Nunito_600SemiBold'
  },

  image: {
    width: 50,
    height: 30,
    borderRadius: 5,
  },

  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  cardAmount: {
    fontSize: 20,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Nunito_600SemiBold'
  },
});

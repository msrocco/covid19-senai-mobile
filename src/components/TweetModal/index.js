import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const TweetModal = ({tweet}) => {
  console.log(tweet);
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
          Data de publicação:{' '}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
          {moment(tweet.created_at).format('DD/MM/YYYY')}
        </Text>
      </View>
      <Text style={styles.text}>{tweet.text}</Text>
      <View style={styles.dataContainer}>
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
          Sentimento:{' '}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
          {tweet.sentiment ? 'Positivo' : 'Negativo'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    marginVertical: 10,
    textAlign: 'justify',
    fontFamily: 'Nunito_400Regular',
    fontSize: 18,
  },
});

export default TweetModal;

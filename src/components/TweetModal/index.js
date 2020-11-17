import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';

function getSentimento(tweet) {
  switch (tweet.sentiment) {
    case 'Positivo':
      return (
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
          Positivo
        </Text>
      );
    case 'Negativo':
      return (
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
          Negativo
        </Text>
      );
    case 'Neutro':
      return (
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
          Neutro
        </Text>
      );
  }
}

const TweetModal = ({ tweet }) => {
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
        {getSentimento(tweet)}
      </View>
      <View
        style={{
          marginTop: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 18 }}>
          Avalie nossa análise
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => Alert.alert('Obrigado pela avaliação!')}>
            <Text style={styles.buttonText}>😃</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Obrigado pela avaliação!')}>
            <Text style={styles.buttonText}>😐</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Obrigado pela avaliação!')}>
            <Text style={styles.buttonText}>☹️</Text>
          </TouchableOpacity>
        </View>
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
  buttonText: {
    fontSize: 40, 
    margin: 5
  }
});

export default TweetModal;

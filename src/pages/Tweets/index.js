import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Tweets({ route }) {
  const { tweet } = route.params;

  const navigation = useNavigation();

  console.log(tweet);

  return (
    <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={25} />
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
            Voltar
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
          Tweet
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
            Data de publicação: {tweet.created_at}
          </Text>
        </View>
        <Text style={styles.tweetText}>{tweet.text}</Text>
        {/* <View>
          <Text>Sentimento</Text>
          <Text>{tweet.sentiment}</Text>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 50,
  },

  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dataContainer: {
    marginHorizontal: 20,
  },

  tweetText: {
    marginVertical: 10,
    textAlign: 'justify',
    fontFamily: 'Nunito_400Regular',
    fontSize: 18,
  },
});

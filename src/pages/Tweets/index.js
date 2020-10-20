import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

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
          {Platform.OS === 'android' ?
            <MaterialIcons name="arrow-back" size={24} color="black" />
            :
            <AntDesign name="back" size={25} />
          }
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
          Tweet
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
            Data de publicação:{" "}
          </Text>
          <Text style={{ fontSize: 16 }}>{tweet.created_at}</Text>
        </View>
        <Text style={styles.tweetText}>{tweet.text}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>Sentimento:{" "}</Text>
          <Text style={{ fontSize: 16 }}>{tweet.sentiment}</Text>
        </View>
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
    marginTop: Platform.OS === 'ios' ? 50 : 30,
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

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function Tweets({ route }) {
  const { tweet } = route.params;

  const navigation = useNavigation();

  // console.log(tweet);

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {Platform.OS === 'android' ? (
              <MaterialIcons name="arrow-back" size={24} color="black" />
            ) : (
              <AntDesign name="back" size={25} />
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
            Tweet
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
              Data de publicação:{' '}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(tweet.created_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Text style={styles.tweetText}>{tweet.text}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
              Sentimento:{' '}
            </Text>
            <Text style={{ fontSize: 16 }}>{tweet.sentiment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    // backgroundColor: '#f5f6fa',
  },

  modalContainer: {
    bottom: 0,
    position: 'absolute',
    height: '70%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },

  headerContainer: {
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

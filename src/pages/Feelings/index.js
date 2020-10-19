import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { Feather, AntDesign } from '@expo/vector-icons';

import service from '../../services/ServiceAPI';

export default function Feelings() {
  const { navigate } = useNavigation();

  const [item, setItem] = useState(null);
  const [tweets, setTweets] = useState([{}]);

  function handleNavigate(tweet) {
    navigate('Tweets', {
      tweet,
    });
  }

  useFocusEffect(() => {
    service
      .getTwitterData(item)
      .then((response) => {
        setTweets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [item]);

  return (
    <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
      <View style={styles.container}>
        <RNPickerSelect
          placeholder={{ label: 'Selecione um tópico' }}
          Icon={() => <Feather name="chevron-down" size={20} color="#6C6C80" />}
          style={pickerSelect}
          onValueChange={(value) => setItem(value)}
          items={[
            { label: 'Covid-19', value: 'covid' },
            { label: 'Coronavírus', value: 'coronavirus' },
            { label: 'Isolamento Social', value: 'isolamento social' },
            { label: 'Pandemia', value: 'pandemia' },
          ]}
        />
        {tweets && (
          <View style={{ width: '100%' }}>
            {tweets.map((tweet, index) => (
              <ListItem
                key={index}
                bottomDivider
                activeOpacity="0.9"
                onPress={() => handleNavigate(tweet)}
              >
                <View style={styles.listContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign
                      name="twitter"
                      size={30}
                      style={{ marginRight: 5 }}
                    />
                    <Text numberOfLines={1} style={styles.tweetText}>
                      {tweet.text}
                    </Text>
                  </View>
                  <ListItem.Chevron />
                </View>
              </ListItem>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 50,
  },

  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tweetText: {
    flex: 1, 
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  }
});

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
  },
  viewContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  iconContainer: {
    padding: 20,
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { Feather, AntDesign } from '@expo/vector-icons';

import service from '../../services/ServiceAPI';

const chevronProps = Platform.select({
  android: {
    size: 20,
  },
});

export default function Feelings() {
  const { navigate } = useNavigation();

  const [item, setItem] = useState('covid');

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  function handleNavigate(tweet) {
    navigate('Tweets', {
      tweet,
    });
  }

  async function loadTweet(pageNumber = page) {
    if (total && pageNumber > total) {
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      `https://api-covid19-senai.herokuapp.com/api/v1/tweets/${item}?page=${pageNumber}`
    );

    const data = await response.json();

    setTotal(Math.floor(data.count / 15));
    setTweets([...tweets, ...data.results]);
    setPage(pageNumber + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    loadTweet();
  }, [item]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: '#fff',
          marginBottom: 5,
          maxWidth: '100%',
        }}
        activeOpacity="0.9"
        onPress={() => handleNavigate(item)}
      >
        <View style={[styles.listContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
            }}
          >
            <AntDesign name="twitter" size={30} style={{ marginRight: 5 }} />
            <Text numberOfLines={1} style={styles.tweetText}>
              {item.text}
            </Text>
          </View>
          <ListItem.Chevron
            containerStyle={{ marginRight: 3 }}
            {...chevronProps}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  function handleChangeItemSelected(item) {
    setPage(1);
    setItem(item);
    setTweets([]);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <RNPickerSelect
          placeholder={{}}
          Icon={() => <Feather name="chevron-down" size={20} color="#6C6C80" />}
          style={pickerSelect}
          onValueChange={(value) => handleChangeItemSelected(value)}
          items={[
            { label: 'Covid-19', value: 'covid' },
            { label: 'Coronavírus', value: 'coronavirus' },
            { label: 'Isolamento Social', value: 'isolamento social' },
            { label: 'Pandemia', value: 'pandemia' },
          ]}
        />
        <FlatList
          data={tweets}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={() => loadTweet()}
          onEndReachedThreshold={0.1}
          style={{ marginBottom: 60 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: Platform.OS === 'ios' ? 10 : 30,
  },

  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 60,
  },

  tweetText: {
    flex: 1,
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },

  loader: {
    marginTop: 20,
    alignItems: 'center',
  },
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
    marginBottom: 15,
    paddingHorizontal: 24,
  },
  iconContainer: {
    padding: 20,
  },
});

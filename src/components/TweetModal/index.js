import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import moment from 'moment';

const { height } = Dimensions.get('window');

const Modal = ({ show, close, tweet }) => {
  console.log(tweet);
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.indicator} />

        <ScrollView>
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
              <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>
                {moment(tweet.created_at).format('DD/MM/YYYY')}
              </Text>
            </View>
            <Text style={styles.text}>{tweet.text}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16 }}>
                Sentimento:{' '}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular' }}>{tweet.sentiment ? 'Positivo' : 'Negativo'}</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '50%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 60,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5,
  },
  dataContainer: {
    marginVertical: 20,
  },
  text: {
    marginVertical: 10,
    textAlign: 'justify',
    fontFamily: 'Nunito_400Regular',
    fontSize: 18,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#0373ab',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 150,
  },
});

export default Modal;

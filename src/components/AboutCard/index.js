import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import linkedinImg from '../../assets/images/linkedin.png';
import githubImg from '../../assets/images/github.png';

export default function AboutCard({
  avatar,
  name,
  description,
  linkedinURL,
  githubURL,
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#448AFF', '#543456']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      ></LinearGradient>
      <View style={styles.infoContainer}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${linkedinURL}`);
          }}
        >
          <Image
            source={linkedinImg}
            style={[styles.imgButton, { marginRight: 10 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${githubURL}`);
          }}
        >
          <Image source={githubImg} style={styles.imgButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '85%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },

  background: {
    height: 90,
    borderRadius: 20,
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: -70,
    marginBottom: 10,
  },

  name: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
  },

  description: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  imgButton: {
    height: 30,
    width: 31,
  },
});

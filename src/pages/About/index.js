import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AboutCard from '../../components/AboutCard';

import femaleAvatar from '../../assets/images/anime2.png';
import maleAvatar from '../../assets/images/anime1.png';

export default function About() {
  return (
    <>
      <View style={{ backgroundColor: '#f5f6fa', flex: 0, height: 40 }}>
        <StatusBar
          backgroundColor="#f5f6fa"
          translucent={false}
          hidden={false}
          style="dark"
        />
      </View>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <AboutCard
              avatar={femaleAvatar}
              name="Marcia Rodrigues"
              description="4º Período <Engenharia de Software> SENAI, Londrina/PR"
              linkedinURL="https://br.linkedin.com/in/rodriguesmarcia/"
              githubURL="https://github.com/mrcrdg"
            />
            <AboutCard
              avatar={maleAvatar}
              name="Matheus Rocco"
              description="6º Período <Engenharia de Software> SENAI, Londrina/PR"
              linkedinURL="https://br.linkedin.com/in/matheusrocco/"
              githubURL="https://github.com/msrocco"
            />
            <AboutCard
              avatar={maleAvatar}
              name="Thiago Santana"
              description="6º Período <Engenharia de Software> SENAI, Londrina/PR"
              linkedinURL="https://br.linkedin.com/in/thiago2santana/"
              githubURL="https://github.com/thiagosan252"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 20,
  },

  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

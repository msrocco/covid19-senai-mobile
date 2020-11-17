import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AboutCard from '../../components/AboutCard';

import femaleAvatar from '../../assets/images/anime2.png';
import maleAvatar from '../../assets/images/anime1.png';

export default function About() {
  return (
    <>
      <View style={{ backgroundColor: '#f5f6fa', flex: 0, height: 45 }}>
        <StatusBar
          backgroundColor="#f5f6fa"
          translucent={false}
          hidden={false}
          style="dark"
        />
      </View>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.abouTitle}>Sobre...</Text>
          </View>
          <View
            style={{
              margin: 15,
              marginTop: 0,
            }}
          >
            <Text style={styles.aboutText}>
              {'\t'}Este projeto trata-se de um estudo sobre a evolução do
              Covid-19, com base em dados históricos de casos e óbitos
              confirmados e disponibilizados por órgãos oficiais do município de
              Londrina, do estado do Paraná e do Brasil.
            </Text>
            <Text style={styles.aboutText}>
              {'\t'}Um dos propósitos deste trabalho é o de realizar uma leitura
              social com base na análise de sentimentos em relação à tópicos
              relativos ao novo coronavírus. Outro objetivo baseia-se na análise
              preditiva sobre a doença, a fim de verificar a tendência de
              evolução de casos no município e no estado.
            </Text>
            <Text style={styles.aboutText}>
              {'\t'}Compreendemos que tais informações são essenciais para o
              planejamento de políticas de contenção, e como parte desse esforço
              contínuo, deseja-se que este estudo possa fornecer informações
              úteis à população e ao poder público de forma geral.
            </Text>
            <Text style={styles.aboutText}>
              {'\t'}Conforme a pandemia continua, espera-se que este projeto
              possa desempenhar um papel significativo no monitoramento do
              impacto do vírus, desde os dados demográficos sobre a doença, até
              as áreas que apresentam maior disseminação.
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.abouTitle}>Equipe</Text>
            </View>
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
    marginTop: 15,
  },

  abouTitle: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    color: '#1d253b',
    marginBottom: 10,
  },

  aboutText: {
    textAlign: 'justify',
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    marginBottom: 20,
    color: '#1d253b',
  },

  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

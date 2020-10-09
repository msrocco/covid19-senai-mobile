import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Card from '../../components/Card';
import PageHeader from '../../components/PageHeader';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Dashboard() {
  return (
    <>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
        <View style={styles.container}>
          <Card title="Confirmados - Brasil" amount="4.041.564" />
          <Card title="Recuperados - Brasil" amount="3.455.659" />
          <Card title="Óbitos - Brasil" amount="128.891" />
          <View style={styles.chartContainer}>
            <LineChart
              style={styles.charts}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [20, 50, 10, 14, 60, 1],
                  },
                ],
              }}
              width={screenWidth * .895}
              height={300}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#344675',
                backgroundGradientFrom: '#344675',
                backgroundGradientTo: '#344675',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#344675',
                },
              }}
              bezier
            />
            <BarChart
              style={styles.charts}
              data={{
                labels: [
                  'Masculino',
                  'Feminino',
                ],
                datasets: [
                  {
                    data: [37, 59],
                  },
                ],
              }}
              width={screenWidth * .895}
              height={260}
              chartConfig={{
                backgroundColor: '#344675',
                backgroundGradientFrom: '#344675',
                backgroundGradientTo: '#344675',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
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
    marginTop: 20,
    margin: 20,
  },

  chartContainer: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
  },
  charts: {
    borderRadius: 10,
    marginVertical: 20
  }
});

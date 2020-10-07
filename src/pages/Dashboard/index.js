import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
// import { LineChart, Grid } from 'react-native-svg-charts';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Card from '../../components/Card';
import PageHeader from '../../components/PageHeader';

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <ScrollView>
        <View style={styles.container}>
          <Card title="Confirmados no Brasil" amount="4.041.564" />
          <Card title="Recuperados no Brasil" amount="3.455.659" />
          <Card title="Óbitos no Brasil" amount="128.891" />
          {/* <View style={styles.chartContainer}>
            <LineChart
              style={{ height: 200, width: '100%' }}
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                strokeWidth: 2,
                stroke: 'url(#gradient)',
              }}
            >
              <Grid />
              <Gradient />
            </LineChart>
          </View> */}
          <View style={styles.chartContainer}>
            <LineChart
              style={{ borderRadius: 10 }}
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
              width={370}
              height={260}
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
              style={{
                borderRadius: 10,
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              style={{ borderRadius: 10 }}
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
              width={370}
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
    marginTop: 0,
    margin: 20,
  },

  chartContainer: {
    marginVertical: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Card from '../../components/Card';
import api from '../../services/api';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Dashboard() {
  const [totalState, setTotalState] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);

  useEffect(() => {
    api.get('api/v1/total/pr/').then((response) => {
      setTotalState(response.data[0]);
    });
  }, []);

  useEffect(() => {
    api.get('api/v1/total/brazil/').then((response) => {
      setTotalCountry(response.data[0]);
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
      <View style={styles.container}>
        <Card
          title="Confirmados"
          amountCountry={totalCountry.confirmed}
          amountState={totalState.confirmed}
        />
        <Card
          title="Recuperados"
          amountCountry={totalCountry.recovered}
          amountState={totalState.recovered}
        />
        <Card
          title="Óbitos"
          amountCountry={totalCountry.deaths}
          amountState={totalState.deaths}
        />
        <Card
          title="Ativos"
          amountCountry={totalCountry.active}
          amountState={totalState.active}
        />
        <View style={styles.chartContainer}>
          <LineChart
            style={styles.charts}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [20, 50, 10, 14, 60, 1],
                },
              ],
            }}
            width={screenWidth * 0.895}
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
              labels: ['Masculino', 'Feminino'],
              datasets: [
                {
                  data: [37, 59],
                },
              ],
            }}
            width={screenWidth * 0.895}
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    margin: 20,
  },

  chartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
  },
  charts: {
    borderRadius: 10,
    marginVertical: 20,
  },
});

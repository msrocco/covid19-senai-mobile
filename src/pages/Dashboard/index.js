import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text, ActivityIndicator } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Card from '../../components/Card';
import service from '../../services/ServiceAPI';
import formatValue from '../../utils/formatValue';
import moment from "moment";
import { Platform } from "react-native";

let marginTopView = 50;

if (Platform.OS === "android") {
  marginTopView = 30;
}

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [totalState, setTotalState] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);
  const [isFetchingDataState, setIsFetchingDataState] = useState(true);
  const [isFetchingDataCountry, setIsFetchingDataCountry] = useState(true);

  const [chartMain, setChartMain] = useState({});
  const [isFetchingDataBigChart, setIsFetchingDataBigChart] = useState(true);

  useEffect(() => {
    service.getTotalPR()
      .then(response => {
        let variavel = {
          'active': formatValue(response.data.active),
          'confirmed': formatValue(response.data.confirmed),
          'recovered': formatValue(response.data.recovered),
          'deaths': formatValue(response.data.deaths)
        }
        setTotalState(variavel);
        setIsFetchingDataState(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    service.getTotalBrazil()
      .then(response => {
        let variavel = {
          'active': formatValue(response.data.active),
          'confirmed': formatValue(response.data.confirmed),
          'recovered': formatValue(response.data.recovered),
          'deaths': formatValue(response.data.deaths)
        }
        setTotalCountry(variavel);
        setIsFetchingDataCountry(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    service.getGrafico(15)
      .then(response => {
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset.data,
              color: (opacity = 1) => `rgba(31, 142, 241, ${opacity})`, // optional
              strokeWidth: 2
            }
          ],
        };
        setChartMain(variavel);
        setIsFetchingDataBigChart(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <ScrollView style={{ backgroundColor: '#f5f6fa' }} >
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
        {isFetchingDataBigChart ?
          <View style={[stylesSpinner.container, stylesSpinner.horizontal]} >
            <ActivityIndicator size="large" color="#1f8ef1" />
          </View>
          :
          <View style={styles.chartContainer} >
            <Text style={styles.txtChart}>Confirmados - Londrina</Text>
            <LineChart
              style={styles.charts}
              data={chartMain}
              width={screenWidth * 0.895}
              height={250}
              chartConfig={chartConfig}
              verticalLabelRotation={-30}
              withInnerLines={false}
              withOuterLines={false}
              bezier
              formatXLabel={
                function (value, index) {
                  var retorno = moment(value).format("DD-MM");
                  return retorno;
                }
              }
            />
          </View>
        }

        <View style={styles.chartContainer, { margin: 0 }} >
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
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: marginTopView,
    margin: 20,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  charts: {
    marginVertical: 8,
  },
  txtChart: {
    fontSize: 16,
    color: '#1d253b',
    padding: 10,
    marginLeft: 10
  }
});

const stylesSpinner = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
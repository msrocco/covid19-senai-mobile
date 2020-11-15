import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import moment from 'moment';

import service from '../../services/ServiceAPI';
import formatValue from '../../utils/formatValue';
import Select from '../../components/Select';

export default function Predictions() {
  const screenWidth = Dimensions.get('window').width;

  const [chartMain, setChartMain] = useState({});
  const [isFetchingDataBigChart, setIsFetchingDataBigChart] = useState(true);

  const [confirmedLineChart, setConfirmedLineChart] = useState({});
  const [
    isFetchingDataConfirmedLineChart,
    setIsFetchingDataConfirmedLineChart,
  ] = useState(true);

  const [chartDeaths, setChartDeaths] = useState({});
  const [isFetchingDataDeathsChart, setIsFetchingDataDeathsChart] = useState(
    true
  );

  const [chartDeathsData, setChartDeathsData] = useState({});

  const [tag, setTag] = useState('total_confirmed');
  const [dailyTag, setDailyTag] = useState('daily_cases');

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '4',
    },
  };

  const spinnerProps = Platform.select({
    android: {
      size: 'large',
      color: '#1f8ef1',
    },
    ios: {
      size: 'large',
    },
  });

  useEffect(() => {
    service
      .getGraficoPrevisao(dailyTag, 'gaussian', 9)
      .then((response) => {
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset[0].data,
              color: (opacity = 1) => `rgba(31, 142, 241, ${opacity})`, // optional
              strokeWidth: 2,
            },
            {
              data: response.data.dataset[1].data,
              color: (opacity = 1) => `rgba(1, 152, 117, ${opacity})`, // optional
              strokeWidth: 5,
            },
            {
              data: response.data.dataset[2].data,
              color: (opacity = 1) => `rgba(150, 40, 27, ${opacity})`, // optional
              strokeWidth: 5,
            },
          ],
        };
        setChartMain(variavel);
        setIsFetchingDataBigChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dailyTag]);

  useEffect(() => {
    service
      .getGraficoPrevisao(tag, 'logistic', 9)
      .then((response) => {
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset[0].data,
              color: (opacity = 1) => `rgba(31, 142, 241, ${opacity})`, // optional
              strokeWidth: 2,
            },
            {
              data: response.data.dataset[1].data,
              color: (opacity = 1) => `rgba(1, 152, 117, ${opacity})`, // optional
              strokeWidth: 3,
            },
            {
              data: response.data.dataset[2].data,
              color: (opacity = 1) => `rgba(150, 40, 27, ${opacity})`, // optional
              strokeWidth: 3,
            },
          ],
        };
        setConfirmedLineChart(variavel);
        setIsFetchingDataConfirmedLineChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tag]);

  useEffect(() => {
    service
      .getGraficoMortes(7)
      .then((response) => {
        setChartDeathsData(response.data);
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset.data,
              color: (opacity = 1) => `rgba(31, 142, 241, ${opacity})`, // optional
              strokeWidth: 2,
            },
          ],
        };
        setChartDeaths(variavel);
        setIsFetchingDataDeathsChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChangeTag = (name) => {
    setTag(name.split(',')[0]);
    setDailyTag(name.split(',')[1]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#f5f6fa', flex: 1 }}>
      <Select
        onValueChange={(value) => handleChangeTag(value)}
        items={[
          { label: 'Londrina - PR', value: 'total_confirmed,daily_cases' },
          { label: 'Paraná', value: 'confirmed_state,daily_cases_state' },
          { label: 'Brasil', value: 'confirmed_country,daily_cases_country' },
        ]}
      />
      <ScrollView style={{ backgroundColor: '#f5f6fa' }}>
        <View style={styles.container}>
          {isFetchingDataBigChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator {...spinnerProps} />
            </View>
          ) : (
            <View style={styles.chartContainer}>
              <Text style={styles.viewTitleChart}>Casos Diários</Text>
              <LineChart
                style={styles.charts}
                data={chartMain}
                width={screenWidth * 0.895}
                height={220}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                fromZero={true}
                formatXLabel={function (value, index) {
                  var retorno = moment(value).format('DD/MM');
                  return retorno;
                }}
                formatYLabel={function (value, index) {
                  var retorno = Math.round(value);
                  return retorno;
                }}
                yLabelsOffset={25}
                xLabelsOffset={10}
                withShadow={false}
                verticalLabelRotation={-20}
              />
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(150, 40, 27, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Desvio Padrão Alto</Text>
              </View>
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(31, 142, 241, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Casos Diários</Text>
              </View>
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(1, 152, 117, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Desvio Padrão Baixo</Text>
              </View>
            </View>
          )}

          {isFetchingDataConfirmedLineChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator {...spinnerProps} />
            </View>
          ) : (
            <View style={styles.chartContainer}>
              <Text style={styles.viewTitleChart}>Casos Confirmados</Text>
              <LineChart
                style={styles.charts}
                data={confirmedLineChart}
                width={screenWidth * 0.895}
                height={220}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                formatXLabel={function (value, index) {
                  var retorno = moment(value).format('DD/MM');
                  return retorno;
                }}
                formatYLabel={function (value, index) {
                  var retorno = Math.round(value);
                  return retorno;
                }}
                yLabelsOffset={12}
                xLabelsOffset={10}
                withShadow={false}
                verticalLabelRotation={-20}
              />
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(150, 40, 27, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Desvio Padrão Alto</Text>
              </View>
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(31, 142, 241, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Casos Diários</Text>
              </View>
              <View style={styles.viewLegenda}>
                <View
                  style={[
                    styles.legendaColor,
                    { backgroundColor: 'rgba(1, 152, 117, 1)' },
                  ]}
                ></View>
                <Text style={styles.legendaTxt}>Desvio Padrão Baixo</Text>
              </View>
            </View>
          )}

          {isFetchingDataDeathsChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator {...spinnerProps} />
            </View>
          ) : (
            <View style={[styles.chartContainer, { marginBottom: 100 }]}>
              <View style={styles.viewTitleChart}>
                <Text style={styles.txtChart}>Óbitos</Text>
              </View>
              <LineChart
                style={[styles.charts, { paddingBottom: 50 }]}
                data={chartDeaths}
                width={screenWidth * 0.895}
                height={220}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                fromZero={true}
                formatXLabel={function (value, index) {
                  var retorno = moment(value).format('DD/MM');
                  return retorno;
                }}
                yLabelsOffset={20}
                xLabelsOffset={10}
              />
              <View style={[styles.viewTitleChart, { marginTop: -50 }]}>
                <Text
                  style={{
                    fontFamily: 'Nunito_700Bold',
                    color: '#1d253b',
                    fontSize: 16,
                  }}
                >
                  Média do índice de mortalidade:{' '}
                </Text>
                <Text style={styles.txtChart}>
                  {formatValue(chartDeathsData.death_rate).replace(',', '.')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },

  title: {
    marginTop: 20,
    color: '#1d253b',
    fontSize: 24,
    fontFamily: 'Nunito_600SemiBold',
  },

  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  charts: {
    marginVertical: 8,
  },

  viewTitleChart: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
  },

  txtChart: {
    color: '#1d253b',
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
  },

  viewLegenda: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  legendaColor: {
    width: 10,
    height: 10,
    margin: 3,
    marginLeft: 20,
    marginRight: 5,
  },

  legendaTxt: {
    fontFamily: 'Nunito_400Regular',
  },
});

const stylesSpinner = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

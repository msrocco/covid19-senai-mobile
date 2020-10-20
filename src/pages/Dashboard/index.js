import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Card from '../../components/Card';
import service from '../../services/ServiceAPI';
import formatValue from '../../utils/formatValue';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [totalState, setTotalState] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);

  const [chartMain, setChartMain] = useState({});
  const [isFetchingDataBigChart, setIsFetchingDataBigChart] = useState(true);

  const [chartDeaths, setChartDeaths] = useState({});
  const [isFetchingDataDeathsChart, setIsFetchingDataDeathsChart] = useState(
    true
  );
  const [chartDeathsData, setChartDeathsData] = useState({});

  const [chartInfectedByAge, setChartInfectedByAge] = useState({});
  const [
    isFetchingDataInfectedByAgeChart,
    setIsFetchingDataInfectedByAgeChart,
  ] = useState(true);

  const [chartInfectedByGenre, setChartInfectedByGenre] = useState({});
  const [
    isFetchingDataInfectedByGenreChart,
    setIsFetchingDataInfectedByGenreChart,
  ] = useState(true);

  useEffect(() => {
    service
      .getTotalPR()
      .then((response) => {
        let variavel = {
          active: formatValue(response.data.active),
          confirmed: formatValue(response.data.confirmed),
          recovered: formatValue(response.data.recovered),
          deaths: formatValue(response.data.deaths),
        };
        setTotalState(variavel);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    service
      .getTotalBrazil()
      .then((response) => {
        let variavel = {
          active: formatValue(response.data.active),
          confirmed: formatValue(response.data.confirmed),
          recovered: formatValue(response.data.recovered),
          deaths: formatValue(response.data.deaths),
        };
        setTotalCountry(variavel);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    service
      .getGrafico(7)
      .then((response) => {
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
        setChartMain(variavel);
        setIsFetchingDataBigChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

  useEffect(() => {
    service
      .getGraficoInfectadosPorIdade()
      .then((response) => {
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset.data,
              color: (opacity = 1) => `rgba(208, 72, 182, ${opacity})`, // optional
              strokeWidth: 2,
            },
          ],
        };
        setChartInfectedByAge(variavel);
        setIsFetchingDataInfectedByAgeChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    service
      .getGraficoInfectadosPorGenero()
      .then((response) => {
        let variavel = {
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.dataset.data,
              color: (opacity = 1) => `rgba(208, 72, 182, ${opacity})`, // optional
              strokeWidth: 2,
            },
          ],
        };
        setChartInfectedByGenre(variavel);
        setIsFetchingDataInfectedByGenreChart(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '1',
      stroke: '#1f8ef1',
    },
  };

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
        <ScrollView horizontal>
          {isFetchingDataBigChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator size="large" color="#1f8ef1" />
            </View>
          ) : (
            <View style={[styles.chartContainer, { marginLeft: 0 }]}>
              <Text style={styles.viewTitleChart}>Confirmados</Text>
              <LineChart
                style={styles.charts}
                data={chartMain}
                width={screenWidth * 0.895}
                height={250}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                fromZero={true}
                formatXLabel={function (value, index) {
                  var retorno = moment(value).format('DD-MM');
                  return retorno;
                }}
                yLabelsOffset={15}
                xLabelsOffset={10}
              />
            </View>
          )}

          {isFetchingDataDeathsChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator size="large" color="#1f8ef1" />
            </View>
          ) : (
            <View style={[styles.chartContainer, { marginRight: 0 }]}>
              <View style={styles.viewTitleChart}>
                <Text style={styles.txtChart}>Óbitos</Text>
              </View>
              <LineChart
                style={styles.charts}
                data={chartDeaths}
                width={screenWidth * 0.895}
                height={250}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                fromZero={true}
                formatXLabel={function (value, index) {
                  var retorno = moment(value).format('DD-MM');
                  return retorno;
                }}
                yLabelsOffset={20}
                xLabelsOffset={10}
              />
              <View style={styles.viewTitleChart}>
                <Text style={[{ fontWeight: 'bold' }, styles.txtChart]}>
                  Índice de mortalidade:{' '}
                </Text>
                <Text style={styles.txtChart}>
                  {formatValue(chartDeathsData.death_rate).replace(',', '.')}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        <ScrollView horizontal>
          {isFetchingDataInfectedByAgeChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator size="large" color="#1f8ef1" />
            </View>
          ) : (
            <View
              style={[styles.chartContainer, { marginTop: 0, marginLeft: 0 }]}
            >
              <View style={styles.viewTitleChart}>
                <Text style={styles.txtChart}>Infectados por Idade</Text>
              </View>
              <BarChart
                style={styles.charts}
                data={chartInfectedByAge}
                width={screenWidth * 0.895}
                height={250}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(208, 72, 182, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                withInnerLines={false}
                showValuesOnTopOfBars={true}
                fromZero={true}
              />
            </View>
          )}
          {isFetchingDataInfectedByGenreChart ? (
            <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
              <ActivityIndicator size="large" color="#1f8ef1" />
            </View>
          ) : (
            <View
              style={[styles.chartContainer, { marginTop: 0, marginRight: 0 }]}
            >
              <View style={styles.viewTitleChart}>
                <Text style={styles.txtChart}>Infectados por Gênero</Text>
              </View>
              <BarChart
                style={styles.charts}
                data={chartInfectedByGenre}
                width={screenWidth * 0.895}
                height={250}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 214, 180, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                withInnerLines={false}
                showValuesOnTopOfBars={true}
                fromZero={true}
              />
            </View>
          )}
        </ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              marginLeft: 20,
              marginBottom: 20,
              color: '#1d253b',
              fontSize: 16,
            }}
          >
            Informações
          </Text>
          <Text
            style={{ color: '#1d253b', textAlign: 'justify', marginBottom: 20 }}
          >
            {' '}
            Os dados apresentados nos gráficos são referentes a cidade de
            Londrina, PR - Brasil.
          </Text>
          <Text
            style={{ color: '#1d253b', textAlign: 'justify', marginBottom: 20 }}
          >
            O número de casos confirmados e óbitos são oriundos dos boletins da{' '}
            <Text
              style={{ color: '#adb5bd', fontWeight: 'bold' }}
              onPress={() => {
                Linking.openURL(
                  'https://www.saude.pr.gov.br/Pagina/Coronavirus-COVID-19'
                );
              }}
            >
              Secretaria Estadual de Saúde
            </Text>{' '}
            do Paraná.
          </Text>

          <Text
            style={{ color: '#1d253b', textAlign: 'justify', marginBottom: 20 }}
          >
            Dados de infectados por idade e por gênero são oriundos do sistema{' '}
            <Text
              style={{ color: '#adb5bd', fontWeight: 'bold' }}
              onPress={() => {
                Linking.openURL(
                  'https://opendatasus.saude.gov.br/dataset/casos-nacionais'
                );
              }}
            >
              e-SUS NOTIFICA
            </Text>
            , que foi desenvolvido para registro de casos de Síndrome Gripal
            suspeitos de Covid-19, e contém dados referentes ao local de
            residência do paciente, independentemente de terem sido notificados
            em outro estado ou município, além de demográficos e clínicos
            epidemiológicos dos casos.
          </Text>
          <Text
            style={{
              color: '#525f7f',
              textAlign: 'justify',
              marginLeft: 15,
              fontSize: 12,
            }}
          >
            &#8226; Estes dados não são referentes ao número total de casos
            confirmados, são considerados apenas dados em que o resultado foi
            POSITIVO no teste para o Covid-19 dentro do dataset disponibilizado
            pelo e-SUS.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    margin: 20,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    height: 350,
  },
  charts: {
    marginVertical: 8,
  },
  viewTitleChart: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
  },
  txtChart: {
    color: '#1d253b',
    fontSize: 16,
  },
});

const stylesSpinner = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';

import { AntDesign, EvilIcons } from '@expo/vector-icons';

import service from '../../services/ServiceAPI';
import TweetModal from '../../components/TweetModal';
import Select from '../../components/Select';

const screenWidth = Dimensions.get('window').width;

const chevronProps = Platform.select({
  android: {
    size: 20,
  },
});

const spinnerProps = Platform.select({
  android: {
    size: 'large',
    color: '#1f8ef1',
  },
  ios: {
    size: 'large',
  },
});

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

export default function Feelings() {
  const [item, setItem] = useState('covid');

  const [tweets, setTweets] = useState([]);
  const [selectedTweet, setSelectedTweet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [pieChartData, setPieChartData] = useState('covid');
  const [isFetchingPieChartData, setIsFetchingPieChartData] = useState(true);

  const [barChartData, setBarChartData] = useState('covid');
  const [isFetchingBarChartData, setIsFetchingBarChartData] = useState(true);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function loadTweet(pageNumber = page) {
    if (total && pageNumber > total) {
      setIsLoading(false);
      return;
    }

    service
      .getTwitterData(item, pageNumber)
      .then((response) => {
        setTotal(Math.floor(response.data.count / 15));
        setTweets([...tweets, ...response.data.results]);
        setPage(pageNumber + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    service
      .getGraficoAnalise(item)
      .then((response) => {
        let data = [
          {
            name: response.data.labels[0],
            population: response.data.dataset.data[0],
            color: 'rgba(131, 220, 225, 1)',
            legendFontColor: '#000',
            legendFontSize: 15,
          },
          {
            name: response.data.labels[1],
            population: response.data.dataset.data[1],
            color: 'rgba(172,176,189, 1)',
            legendFontColor: '#000',
            legendFontSize: 15,
          },
          {
            name: response.data.labels[2],
            population: response.data.dataset.data[2],
            color: 'rgba(86, 143, 254, 1)',
            legendFontColor: '#000',
            legendFontSize: 15,
          },
        ];
        setPieChartData(data);
        setIsFetchingPieChartData(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [item]);

  useEffect(() => {
    service
      .getGraficoEvolucaoTemporal(item)
      .then((response) => {
        let data = {
          labels: response.data.labels,
          legend: ['Positivo', 'Neutro', 'Negativo'],
          data: [
            [
              response.data.dataset[0].data[0],
              response.data.dataset[1].data[0],
              response.data.dataset[2].data[0]
            ],
            [
              response.data.dataset[0].data[1],
              response.data.dataset[1].data[1],
              response.data.dataset[2].data[1]
            ],
          ],
          barColors: ['#83DCE1', '#acb0bd', '#568FFE'],
        };
        setBarChartData(data);
        setIsFetchingBarChartData(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [item]);

  useEffect(() => {
    setIsLoading(true);
    loadTweet();
  }, [item]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: '#fff',
          marginBottom: 5,
          maxWidth: '100%',
        }}
        activeOpacity="0.9"
        onPress={() => {
          onOpen();
          setSelectedTweet(item);
        }}
      >
        <View style={[styles.listContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
            }}
          >
            <AntDesign
              name="twitter"
              size={24}
              style={{ marginRight: 5, marginLeft: 5 }}
            />
            <Text numberOfLines={1} style={styles.tweetText}>
              {item.text}
            </Text>
          </View>
          <ListItem.Chevron
            containerStyle={{ marginRight: 3 }}
            {...chevronProps}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator {...spinnerProps} />
      </View>
    ) : (
      <View style={styles.viewFooter}>
        <Text style={styles.txtFooter}>Tweets carregados com sucesso</Text>
        <EvilIcons name="check" size={24} color="black" />
      </View>
    );
  };

  function handleChangeItemSelected(item) {
    setPage(1);
    setItem(item);
    setTweets([]);
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#f5f6fa', flex: 1 }}>
      <Select
        onValueChange={(value) => handleChangeItemSelected(value)}
        items={[
          { label: 'Covid-19', value: 'covid' },
          { label: 'Coronavírus', value: 'coronavirus' },
          { label: 'Isolamento Social', value: 'isolamento social' },
          { label: 'Pandemia', value: 'pandemia' },
        ]}
      />
      <FlatList
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={() => loadTweet()}
        onEndReachedThreshold={0.1}
        style={{ marginBottom: 0, backgroundColor: '#f5f6fa' }}
        contentContainerStyle={{ margin: 20, marginTop: 0 }}
        ListHeaderComponent={
          <>
            {isFetchingPieChartData ? (
              <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
                <ActivityIndicator {...spinnerProps} />
              </View>
            ) : (
              <View style={styles.chartContainer}>
                <View style={styles.viewTitleChart}>
                  <Text style={styles.txtChart}>Análise Gráfica</Text>
                </View>

                <PieChart
                  data={pieChartData}
                  width={screenWidth * 0.895}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.charts}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft={Platform.OS === 'ios' ? '15' : '0'}
                  absolute
                />
              </View>
            )}
            {isFetchingBarChartData ? (
              <View style={[stylesSpinner.container, stylesSpinner.horizontal]}>
                <ActivityIndicator {...spinnerProps} />
              </View>
            ) : (
              <View style={styles.chartContainer}>
                <View style={styles.viewTitleChart}>
                  <Text style={styles.txtChart}>Evolução Temporal</Text>
                </View>
                <StackedBarChart
                  data={barChartData}
                  style={styles.charts}
                  width={screenWidth * 0.895}
                  height={250}
                  chartConfig={chartConfig}
                  withHorizontalLabels={false}
                />
              </View>
            )}
          </>
        }
      />

      <Modalize ref={modalizeRef} snapPoint={500} modalTopOffset={100}>
        <TweetModal tweet={selectedTweet} />
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 60,
  },

  tweetText: {
    flex: 1,
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },

  loader: {
    marginTop: 20,
    marginBottom: 70,
    alignItems: 'center',
  },

  chartContainer: {
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 0,
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
    fontFamily: 'Nunito_400Regular',
  },
  txtFooter: {
    color: '#1d253b',
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    marginRight: 5,
  },
  viewFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 20
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

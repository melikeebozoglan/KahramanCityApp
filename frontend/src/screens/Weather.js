import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

const Weather = () => {
  const navigation = useNavigation();
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '76010f98d4fb055ea3c95365cd2b4111'; // OpenWeatherMap API anahtarı
  const city = 'Kahramanmaras';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
      );
      //console.log(response.data);

      const dailyData = processForecastData(response.data.list);

      const today = dailyData[0]; 
      const futureDays = dailyData.slice(1, 5); 

      setForecastData([today, ...futureDays]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Hava durumu verisi alınamadı');
    }
    
  };

  const processForecastData = (data) => {
    const daily = {};

    data.forEach((entry) => {
      const date = dayjs(entry.dt_txt).format('YYYY-MM-DD');
      if (!daily[date]) {
        daily[date] = {
          date: date,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          weather: entry.weather[0],
        };
      } else {
        daily[date].temp_min = Math.min(daily[date].temp_min, entry.main.temp_min);
        daily[date].temp_max = Math.max(daily[date].temp_max, entry.main.temp_max);
      }
    });

    const forecastArray = Object.values(daily);

    // Sadece ilk 5 günü al
    return forecastArray.slice(0, 5);
  };

  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Header pageName="Weather" onPress={() => navigation.navigate('Home')} />
      <View style={{flexDirection:"row" }}>
      <Icon name="map-marker" size={30} color="black" style={{paddingTop: 5}}/>
      <Text style={styles.title}>Kahramanmaraş</Text>
      </View>

      
      

      <View style={styles.todayWeatherContainer}>
      <Image
          style={{ width: 120, height: 120}}
          source={{ uri: `http://openweathermap.org/img/wn/${forecastData[0].weather.icon}@2x.png` }}
          />
        <Text style={styles.todayWeatherText}>{Math.round(forecastData[0].temp_max)} °C / {Math.round(forecastData[0].temp_min)} °C</Text>
        
        <View >
          <Text style={styles.todayText}>{dayjs(forecastData[0].date).format('dddd, DD MMM YYYY')}</Text>
        </View>

      </View>

      <View style={styles.flatContainer}>
        <FlatList
          data={forecastData.slice(1)}
          keyExtractor={(item) => item.date}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {dayjs(item.date).format('DD MMM YYYY')}
              </Text>
              <Text style={styles.itemText}>{Math.round(item.temp_max)}°C / {Math.round(item.temp_min)} °C</Text>
              {/* <Text style={styles.itemText}>{item.weather[0].description}</Text> */}
              <Image
                style={{ width: 35, height: 35 }}
                source={{ uri: `http://openweathermap.org/img/wn/${item.weather.icon}@2x.png` }}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ede1d5',
    paddingTop: 30,
    flexDirection: 'column',
  },
  title: {
    color: 'black',
    fontSize: 30,
    marginLeft: 20,
  },
  todayWeatherContainer: {
    alignItems: "center",
  },
  todayWeatherText: {
    color: 'black',
    fontSize: 35,
    
  },
  todayText:{
    color: 'black',
    fontSize: 20,
    marginRight: 10,
    marginTop: 10,
  },
  flatContainer: {
    backgroundColor: '#e3d7cc',
    borderRadius:40,
    width:  340,
    height: 250,
    paddingRight: 15,   
    paddingLeft: 25, 
    paddingTop:35,
  },
  separator: {
    height: 15, // Boşluk genişliği
  },
  item: {
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'black',
    fontSize: 14,
  },
});

export default Weather;

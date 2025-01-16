import React, {useEffect, useState} from 'react';
import { StyleSheet,  View, Text, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          setError('No token found');
          return;
        }
  
        const response = await axios.get('http://10.0.2.2:8000/account/protected-route', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
  
        const categoryResponse = await axios.get('http://10.0.2.2:8000/items/categorys/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(categoryResponse.data);
      } catch (err) {
        setError(err.response?.data || 'Error fetching data');
      }
    };
  
    fetchData();
  }, []);

  return (
    <View style={styles.titleContainer}>
      <Header pageName="Home" />

      <View style={styles.firstBox}>
        <Text style={styles.h1}>Welcome to Kahramanmaraş</Text>
        <TouchableOpacity style={styles.weather}  onPress={() => navigation.navigate('Weather')} >
          <Text style={styles.h2}>Weather Forecast</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondBox}>
        <View>
        {category.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}  // key prop eklenmeli
            style={styles.item}
            onPress={() => navigation.navigate('ItemList', {slug: item.slug, name: item.name})}>
            <Text style={styles.category}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        </View>
        <View>
        {category.slice(2, 4).map((item, index) => (
          <TouchableOpacity
            key={index}  // key prop eklenmeli
            style={styles.item}
            onPress={() => navigation.navigate('ItemList', {slug: item.slug, name: item.name})}>
            <Text style={styles.category}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,

    backgroundColor: '#ede1d5',
  },

  firstBox: {
    backgroundColor: '#282828',
    flex: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },

  h1: {
    fontSize: 28,
    marginTop: 30,
    marginLeft: 80,
    marginRight: 60,
    color: '#ede1d5',
  },

  h2:{
    
    fontSize: 18,
    color: '#ede1d5',
    

  },
  weather: {
    marginTop: 25,
    borderColor: '#ede1d5',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
  },
  category:{
    color: '#ede1d5',
  },

  secondBox: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ede1d5',
  },
  item: {
    height: 140,
    width: 138,
    backgroundColor: '#282828',
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

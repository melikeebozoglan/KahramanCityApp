import React, {useEffect, useState} from 'react';
import { StyleSheet,  View, Text, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import MainItem from '../components/MainItem';

export default function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('http://10.0.2.2:8000/items/categorys/')
      .then(response => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the category!', error);
      });
  }, []);

  return (
    <View style={styles.titleContainer}>
      <Header pageName="Home" />

      <View style={styles.firstBox}>
        <Text style={styles.h1}>Welcome to Kahramanmaraş</Text>
      </View>

      <View style={styles.secondBox}>
        <View>
        {category.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}  // key prop eklenmeli
            style={styles.item}
            onPress={() => navigation.navigate('ItemList', {slug: item.slug, name: item.name})}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
        </View>
        <View>
        {category.slice(2, 4).map((item, index) => (
          <TouchableOpacity
            key={index}  // key prop eklenmeli
            style={styles.item}
            onPress={() => navigation.navigate('ItemList', {slug: item.slug})}>
            <Text>{item.name}</Text>
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
  },

  h1: {
    fontSize: 28,
    marginTop: 50,
    marginLeft: 80,
    marginRight: 60,

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
  },
});

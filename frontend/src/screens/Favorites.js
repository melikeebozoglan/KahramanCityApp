
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);
  const baseUrl = 'http://10.0.2.2:8000';

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found!');
          return;
        }

      const url = 'http://10.0.2.2:8000/items/favorites/';
      

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response data:', response.data);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error.response?.data || error.message);
      }
    };
    

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>

      <Header pageName='Favorites'/>

      <View style={styles.flatContainer}>
        <FlatList
          horizontal
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate('ItemDetail', {image: `${baseUrl}${item.item_details.image}`, name: item.item_details.name, description: item.item_details.description, itemId: item.id, isFavorite: true,})}>
                <Image
                  source={{uri: `${baseUrl}${item.item_details.image}`}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => navigation.navigate('ItemDetail', {image: `${baseUrl}${item.item_details.image}`, name: item.item_details.name, description: item.item_details.description, itemId: item.id, isFavorite: true,})}>
                <Icon
                  name="map-marker"
                  size={15}
                  color="black"
                  style={{paddingTop: 2, paddingRight: 5}}
                />
                <Text>{item.item_details.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ede1d5',
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  flatContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ede1d5',
    paddingLeft: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: '#3b3b3b',
    borderRadius: 45,
    width: 254,
    height: 364,
    backgroundColor: 'white',
    marginRight: 15,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    borderWidth: 1,
    borderColor: '#3b3b3b',
    borderRadius: 45,
    width: 254,
    height: 50,
    backgroundColor: '#ede1d5',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    marginLeft: 10, // Resim ile metin arasında boşluk
    flexShrink: 1, // Uzun metinlerin taşmasını önlemek için
  },
  image: {
    width: 252,
    height: 363,
    borderRadius: 45,
  },
});

export default Favorites;
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemDetail = ({ route }) => {
  const { itemId, image, description, name } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  // Favori durumunu kontrol eden fonksiyon
  const checkFavoriteStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found!');
        return;
      }

      const url = `http://10.0.2.2:8000/items/favorites/`; // Tüm favori öğeleri çeken endpoint

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Gelen favori listesinde itemId kontrol edilir
      const isFav = response.data.some((favorite) => favorite.item === itemId);
      setIsFavorite(isFav);
    } catch (error) {
      console.error('Error checking favorite status:', error.response?.data || error.message);
    }
  };

  // Favorilere ekleme fonksiyonu
  const addToFavorites = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found!');
      return;
    }

    const url = `http://10.0.2.2:8000/items/favorites/add/`;

    console.log("Adding to favorites with itemId:", itemId);

    try {
      const response = await axios.post(
        url,
        { item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorite(true); // Başarılı olursa favori durumunu güncelle
      // Alert.alert('Başarılı', 'Favorilere eklendi!');
    } catch (error) {
      console.error('Error adding to favorites:', error.response?.data || error.message);
      // Alert.alert('Hata', 'Favorilere eklenirken bir hata oluştu.');
    }
  };

  // Favorilerden çıkarma fonksiyonu
  const removeFromFavorites = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found!');
      return;
    }

    const url = `http://10.0.2.2:8000/items/favorites/remove/${itemId}/`;
    

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setIsFavorite(false);
        // Alert.alert('Başarılı', 'Favorilerden çıkarıldı!');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        // Alert.alert('Hata', 'Favorilerden çıkarılırken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Network error:', error.message);
      // Alert.alert('Hata', 'Favorilerden çıkarılırken bir ağ hatası oluştu.');
    }
  };

  // Favori durumunu değiştiren fonksiyon
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(); // Zaten favoriyse çıkar
    } else {
      addToFavorites(); // Favoride değilse ekle
    }
  };

  // Sayfa yüklendiğinde favori durumunu kontrol et
  useEffect(() => {
    checkFavoriteStatus();
  }, [itemId]);


  return (
    <View style={styles.container}>
      <Header pageName="Detail"/>

      <View style={styles.box}>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
        
      </View>

      <View style={styles.titleBox}>
        <Icon name="map-marker" size={15} color="black" style={{paddingTop: 2, paddingRight:5}}/>
        <Text>{name}</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={handleToggleFavorite}>
        <Icon name={isFavorite ? "heart" : "heart-o"} size={17} color='black' />
      </TouchableOpacity>
      </View>

      <View style={styles.description}>
        <Text numberOfLines={8}>{description}</Text>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ede1d5',
    paddingTop: 30,
    justifyContent: "space-between",
  },
  box: {
    // position: 'relative',
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 364,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer:{
    // position: 'absolute',
    // top: 40,
    //zIndex: 1,
    // right: 40,
  },
  titleBox: {
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 50,
    backgroundColor: '#ede1d5',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    flexDirection:"row",
    justifyContent: "space-evenly"
  },
  title: {
    fontSize: 16,
    marginLeft: 10, 
    flexShrink: 1, // Uzun metinlerin taşmasını önlemek için
  },
  image: {
    width: 252,
    height: 363,
    borderRadius: 45,
    // position: 'absolute',
    // zIndex: 2,
  },
  description:{
    width: 254,
    height: 150,
  },
});

export default ItemDetail;
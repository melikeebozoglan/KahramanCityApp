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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ItemList = ({ route }) => {
  const navigation = useNavigation();
  const { slug, name } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log('Route params:', route.params);
  
        if (!slug) {
          console.warn('Slug is missing, skipping fetch.');
          return;
        }
  
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found!');
          return;
        }
  
        const response = await axios.get(`http://10.0.2.2:8000/items/categorys/${slug}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Fetched items:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('There was an error fetching the items!', error);
      }
    };
  
    fetchItems();
  }, [slug]);

  return (
    <View style={styles.container}>

      <Header pageName={name} />

      <View style={styles.flatContainer}>
        <FlatList
          horizontal
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate('ItemDetail', {image: item.image, name: item.name, description: item.description})}>
                <Image
                  source={{uri: item.image}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => navigation.navigate('ItemDetail', {item})}>
                <Icon
                  name="map-marker"
                  size={15}
                  color="black"
                  style={{paddingTop: 2, paddingRight: 5}}
                />
                <Text>{item.name}</Text>
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

export default ItemList;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemDetail = ({ route }) => {

  const { image, description, name } = route.params;

  return (
    <View style={styles.container}>
      <Header pageName="Detail"/>

      <View style={styles.box}>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.titleBox}>
        <Icon name="map-marker" size={15} color="black" style={{paddingTop: 2, paddingRight:5}}/>
        <Text>{name}</Text>
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
    //marginBottom:20,
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ede1d5',
    paddingTop: 30,
    justifyContent: "space-between",
  },
  box: {
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 364,
    backgroundColor: 'white',
    //marginRight: 15,
    //marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 50,
    backgroundColor: '#ede1d5',
    //marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    flexDirection:"row",
    
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
  description:{
    width: 254,
    height: 150,
  },
});

export default ItemDetail;

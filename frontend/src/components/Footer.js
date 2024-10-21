import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={30} color="#ede1d5" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Transportation')}>
      <Icon name="plane" size={29} color="#ede1d5" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
      <Icon name="heart" size={26} color="#ede1d5" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Icon name="user" size={28} color="#ede1d5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    //marginBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 90,
    //marginRight: 15,
    backgroundColor: '#282828',
    //marginBottom: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default Footer;

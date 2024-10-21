import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

function MainItem() {
  const navigation = useNavigation();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('http://10.0.2.2:8000/items/categorys/')
      .then(response => {
        //console.log(response.data);
        setCategory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cc!', error);
      });
  }, []);

  return (
    <View>
      {category.slice(0, 4).map((item, index) => (
        <TouchableOpacity
          key={index}  // key prop eklenmeli
          style={styles.item}
          onPress={() => navigation.navigate('ItemList')}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 140,
    width: 138,
    backgroundColor: '#282828',
    borderRadius: 30,
    marginTop: 30,
  },
});

export default MainItem;

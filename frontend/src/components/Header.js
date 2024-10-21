import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({pageName}) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.pageName}>{pageName}</Text>

      {pageName == 'Detail' ? (
        <TouchableOpacity>
          <Icon name="heart" size={25} color="black" style={{paddingTop: 10}} />
        </TouchableOpacity>
      ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon name="bell-o" size={23} color="black" />
          </TouchableOpacity>
        ) && pageName == 'Notification' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={23} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell-o" size={23} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ede1d5',

    //marginRight: "100%",
  },
  pageName: {
    color: 'black',
    fontSize: 25,
  },
});

export default Header;

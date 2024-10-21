import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';

const notifications = [
  {id: '1', title: 'Bildirim 1', description: 'Bu birinci bildirimdir.'},
  {id: '2', title: 'Bildirim 2', description: 'Bu ikinci bildirimdir.'},
  {id: '3', title: 'Bildirim 3', description: 'Bu üçüncü bildirimdir.'},
];

const Notification = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header pageName="Notification" />

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />

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
    justifyContent: 'space-between',
  },
  notificationContainer:{},
  title: {},
  description:{},
  flatListContent: {},
});

export default Notification;

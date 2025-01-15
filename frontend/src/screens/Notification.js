import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // API isteği
    const fetchNotifications = async () => {
      try {
        let token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found!');
          return;
        }
    
        try {
          // Bildirimleri al
          const response = await axios.get('http://10.0.2.2:8000/notifications/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotifications(response.data);
        } catch (error) {
          // Eğer 401 hatası dönerse token yenile
          if (error.response?.status === 401) {
            console.warn('Access token expired, trying to refresh...');
            token = await refreshAccessToken();
    
            if (token) {
              const retryResponse = await axios.get('http://10.0.2.2:8000/notifications/', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setNotifications(retryResponse.data);
            } else {
              console.error('Failed to refresh token. Logging out...');
              handleTokenExpiry();
            }
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.response?.data || error.message);
      }
    };

    const refreshAccessToken = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.error('No refresh token found!');
          return null;
        }
    
        const response = await axios.post('http://10.0.2.2:8000/token/refresh/', {
          refresh: refreshToken,
        });
    
        const newAccessToken = response.data.access;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
      } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
        return null;
      }
    };
    
    
    fetchNotifications();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
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
    //alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ede1d5',
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  notificationContainer:{
    padding: 10,

    paddingLeft: 20,
    borderColor: 'rgba(89, 78, 78, 1)',
    //borderTopWidth: 2, 
    borderBottomWidth: 2,
  },
  title: {
    paddingBottom: 3,
    fontSize: 15,
    
  },
  message:{
    color: 'rgb(100, 99, 99)',
    fontSize: 13,
  },
  flatListContent: {
    borderColor: 'rgba(89, 78, 78, 1)',
    borderTopWidth: 2, 
    marginTop: 15,
  },
});

export default Notification;

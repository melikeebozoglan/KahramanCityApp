import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/account/login/', {
        email,
        password,
      });
      const { access, refresh } = response.data;
      setMessage('Login successful!');

      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);

      navigation.navigate('Home');
      console.log('kullanıcııı', email, password)
      // Tokenları güvenli bir şekilde sakla
    } catch (error) {
      setMessage('Error: ' + error.response.data.error);
    }
  };


  return (
    <View style={styles.titleContainer}>
      <Text style={styles.h1}>Login</Text>
      <Text style={styles.h2}>Sign in to continue.</Text>
      <Text style={styles.h3}>Email</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize="none"></TextInput>
      <Text style={styles.h3}>Password</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="*********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"></TextInput>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>LOGIN</Text> 
      </TouchableOpacity>
      <Text>{message}</Text>

      <Text style={[styles.forgotStyle, styles.textLine]} onPress={() => navigation.navigate("ForgotPassword")}>Forgot Password</Text>

      <Text>
        Don't have an account?{' '}
        <Text title = "Create Account " style={styles.textLine} onPress = {() =>navigation.navigate("CreateNewAccount")}>Create an account.</Text></Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ede1d5',
    flex: 1,
  },
  h1: {
    fontFamily: 'Poppins',
    marginTop: 100,
    fontSize: 31.2,
    fontWeight: 'bold',
  },
  h2: {
    marginBottom: 50,
  },
  h3: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginRight: 190,
  },
  buttonStyle: {
    height: 50,
    width: 250,
    color: 'rgba(89, 78, 78, 1)',
    borderRadius: 20,
    borderColor: 'rgba(89, 78, 78, 1)',
    borderWidth: 2,
    paddingLeft: 30,
  },

  loginButton: {
    height: 50,
    width: 250,
    color: 'rgba(89, 78, 78, 1)',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 3,
    paddingLeft: 30,
    fontSize: 13.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: 20,
    marginTop: 20,
  },

  forgotStyle: {
    fontSize: 12,
  },

  textLine: {
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: 'bold',
  },
});

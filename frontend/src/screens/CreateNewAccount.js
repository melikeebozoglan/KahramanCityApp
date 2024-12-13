import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateNewAccount({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/account/register/', {
        email,
        password,
        username,
      });
      const { access, refresh } = response.data;
      setMessage('register successful!');

      navigation.navigate('Login');
      console.log('kullanıcııı', username, email, password)

      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);

      
      // Tokenları güvenli bir şekilde sakla
    } catch (error) {
      setMessage('Error: ' + error.response.data.error);
    }
  };


  return (
    <View style={styles.titleContainer}>
      
      <Text style={styles.header}>Create New Account</Text>

      <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 20}}>
        <Text style={styles.h2}>Already registered? </Text>
        <TouchableOpacity
          style={styles.textLine}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textLine}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.h2}> here.</Text>
      </View>

      <View>
        <Text style={styles.h3}>User Name</Text>
          <TextInput
            style={styles.buttonStyle}
            placeholder="User Name"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"></TextInput>
      </View>

      <View>
        <Text style={styles.h3}>Email</Text>
        <TextInput
          style={styles.buttonStyle}
          placeholder="hello@reallygreatsite.com"
          value={email}
          onChangeText={setEmail}
          // keyboardType='email-address'
          autoCapitalize="none"></TextInput>
      </View>
      
      <View>
        <Text style={styles.h3}>Password</Text>
        <TextInput
          style={styles.buttonStyle}
          placeholder="*********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"></TextInput>
      </View>
      

      <TouchableOpacity style={styles.SignUpButton} onPress={handleRegister}>
        <Text style={styles.darkText}>Sign Up</Text> 
      </TouchableOpacity>
      <Text>{message}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: '#ede1d5',
    alignItems: 'center',
  },

  header: {
    color: 'black',
    fontSize: 38,
    marginTop: 80,
    // marginLeft: 25,
    // marginRight: 25,
    textAlign: 'center',
  },

  h2: {
    marginTop: 10,
    fontSize: 13,
    marginBottom: 20,
  },

  h3: {
    fontSize: 14,
    // marginLeft: 80,
  },

  textLine: {
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 5,
  },

  darkText: {
    fontWeight: 'bold',
    fontSize: 17,
  },

  buttonStyle: {
    height: 50,
    width: 250,
    color: 'rgba(89, 78, 78, 1)',
    borderRadius: 20,
    borderColor: 'rgba(89, 78, 78, 1)',
    borderWidth: 2,
    paddingLeft: 30,
    // marginLeft: 70,
    marginBottom: 15,
  },
  SignUpButton: {
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
    marginTop: 30,
    // marginLeft: 70,
  },
});

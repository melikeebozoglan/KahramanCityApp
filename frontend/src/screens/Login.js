import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import React from 'react';

export default function Login({navigation}) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.h1}>Login</Text>
      <Text style={styles.h2}>Sign in to continue.</Text>
      <Text style={styles.h3}>Email</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="email"
        autoCapitalize="none"></TextInput>
      <Text style={styles.h3}>Password</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="Password"
        autoCapitalize="none"></TextInput>

      <View style={styles.loginButton}>
        <Text>LOGIN </Text>
      </View>

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

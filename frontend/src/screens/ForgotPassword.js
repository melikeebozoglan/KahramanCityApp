import {Image, StyleSheet, Platform, View, Text, TextInput} from 'react-native';


export default function ForgotPassword() {
  return (
    <View style={styles.Container}>
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.h3}>Email</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="hello@reallygreatsite.com"
        autoCapitalize="none"></TextInput>

      <View style={styles.SignUpButton}>
        <Text style={styles.darkText}>Sign Up </Text>
      </View>

      <Image
        source={require('../../logos/KahramanCity-Black.png')} // Adjust the path as needed
        style={styles.logoImage}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ede1d5',
  },
  buttonStyle: {
    height: 50,
    width: 250,
    color: 'rgba(89, 78, 78, 1)',
    borderRadius: 20,
    borderColor: 'rgba(89, 78, 78, 1)',
    borderWidth: 2,
    paddingLeft: 30,
    marginLeft: 70,
    marginBottom: 15,
  },
  h3: {
    fontSize: 14,
    marginLeft: 80,
    marginBottom: 5,
  },

  header: {
    color: 'black',
    fontSize: 38,
    marginTop: 90,
    marginLeft: 55,
    marginRight: 55,
    textAlign: 'center',
    marginBottom: 45,
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
    marginLeft: 70,
  },
  darkText: {
    fontWeight: 'bold',
    fontSize: 17,
  },

  logoImage: {
    width: 184,
    height: 100,
    marginTop: 200,
    marginLeft: 110,
  },
});

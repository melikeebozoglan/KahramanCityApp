import {Image, StyleSheet, Platform, View, Text, TextInput} from 'react-native';

export default function CreateNewAccount() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>Create New Account</Text>
      <Text style={styles.h2}>
        Already registered? <Text style={styles.textLine}>Log in </Text>here.
      </Text>
      <Text style={styles.h3}>First Name</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="First Name"
        autoCapitalize="none"></TextInput>
      <Text style={styles.h3}>Last Name</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="Last Name"
        autoCapitalize="none"></TextInput>
      <Text style={styles.h3}>Email</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="hello@reallygreatsite.com"
        autoCapitalize="none"></TextInput>
      <Text style={styles.h3}>Password</Text>
      <TextInput
        style={styles.buttonStyle}
        placeholder="*********"
        autoCapitalize="none"></TextInput>

      <View style={styles.SignUpButton}>
        <Text style={styles.darkText}>Sign Up </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: '#ede1d5',
  },

  header: {
    color: 'black',
    fontSize: 38,
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
  },

  h2: {
    marginTop: 10,
    fontSize: 13,
    marginLeft: 100,
    marginBottom: 20,
  },

  h3: {
    fontSize: 14,
    marginLeft: 80,
  },

  textLine: {
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: 'bold',
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
    marginLeft: 70,
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
    marginLeft: 70,
  },
});

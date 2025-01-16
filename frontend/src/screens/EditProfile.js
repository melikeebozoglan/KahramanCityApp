import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found!');
      return;
    }

    try {
      const response = await axios.put(
        "http://10.0.2.2:8000/api/update-profile/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Profile Updated", "Your profile was updated successfully!");
    } catch (error) {
      console.error(error.response.data);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access the gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Set aspect ratio if needed
      quality: 1, // Set the image quality
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Update the state with the new image URI
    }
  };
  return (
    <View style={styles.container}>
      <Header pageName="Edit Profile" />
      <Image
        source={
          profileImage ? { uri: profileImage } : require("../../logos/user.png")
        } // Show selected image or default image
        style={styles.imageStyle}
      />
      <TouchableOpacity onPress={pickImage}  style={{paddingTop:20}}>
        <FontAwesome name="pencil" size={16} color="black" />
      </TouchableOpacity>
      <Text style={styles.profileName}>Jonathan Patterson</Text>
      <Text style={styles.profileEmail}>hello@reallygreatsite.com</Text>

      <View style={styles.formContainer}>
        <Text style={styles.h3}>FIRST NAME</Text>
        <TextInput style={styles.buttonStyle} 
        autoCapitalize="none" 
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}/>
        <Text style={styles.h3}>LAST NAME</Text>
        <TextInput style={styles.buttonStyle} 
        autoCapitalize="none"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}/>

        <Text style={styles.h3}>EMAIL</Text>
        <TextInput
          style={styles.buttonStyle}
          placeholder="hello@reallygreatsite.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        ></TextInput>

        <TouchableOpacity onPress={handleSave}>
        <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
        
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede1d5',
    alignItems: "center",
    paddingTop: 30,
  },
  titleContainer: {
    backgroundColor: "#ede1d5",
  },
  imageStyle: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    marginTop: 30
  },
  buttonStyle: {
    height: 40,
    width: 250,
    color: "rgba(89, 78, 78, 1)",
    borderRadius: 20,
    borderColor: "rgba(89, 78, 78, 1)",
    borderWidth: 2,
    //paddingLeft: 30,
    // marginLeft: 70,
    marginBottom: 5,
  },
  saveButton: {
    height: 40,
    width: 250,
    color: "rgba(89, 78, 78, 1)",
    borderRadius: 20,
    borderColor: "rgba(89, 78, 78, 1)",
    borderWidth: 2,
    //paddingLeft: 30,
    // marginLeft: 70,
    marginBottom: 15,
    marginTop: 25,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "black",
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777",
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 55,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfile;

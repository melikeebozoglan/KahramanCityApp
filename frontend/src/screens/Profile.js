import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [isTurkish, setIsTurkish] = useState(i18n.language === "tr");
  const { isDarkMode, toggleTheme } = useTheme();
  const [profileImage, setProfileImage] = useState(null);
  const toggleLanguage = () => {
    const newLanguage = isTurkish ? "en" : "tr";
    i18n.changeLanguage(newLanguage); // i18n ile dil değiştir
    setIsTurkish(!isTurkish); // Switch'in durumunu değiştir
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
    <View style={[styles.container, isDarkMode && styles.darkBackground]}>
      <Header pageName="Profile" />

      <View style={styles.profileSection}>
        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../logos/user.png")
            } // Show selected image or default image
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={[styles.name, isDarkMode && styles.darkText]}>
          Jonathan Patterson
        </Text>
        <Text style={[styles.email, isDarkMode && styles.darkText]}>
          hello@reallygreatsite.com
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>{t("Edit Profile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newbox}>
      <View style={styles.optionRow}>
        <Ionicons name="earth" size={24} color="black" />
        <Text
          style={[styles.optionText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          {t("language")}
        </Text>
        <Switch value={isTurkish} onValueChange={toggleLanguage} />
      </View>

      <View style={styles.options}>
        <View style={styles.optionRow}>
          <Icon
            name="settings"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
          <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
            {t("mode")}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={styles.options}>
        <View style={styles.optionRow}>
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
            {t("logout")}
          </Text>
        </View>
      </View>

      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede1d5',
    paddingTop: 30,
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  profileSection: {
    paddingTop: 40,
    alignItems: "center",
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginLeft: 20,
  },
  editButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  options: {
    marginTop: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  newbox:{
    marginBottom: 80,
  },
});
export default Profile;

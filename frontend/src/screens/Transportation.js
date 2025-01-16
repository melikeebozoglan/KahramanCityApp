import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Transportation() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          setError("No token found");
          return;
        }

        // Kullanıcı verisini al
        const response = await axios.get(
          "http://10.0.2.2:8000/account/protected-route",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);

        // Ulaşım kategorisindeki öğeleri al
        const slug = await axios.get(
          `http://10.0.2.2:8000/items/categorys/transportation/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched items:", slug.data);
        setItems(slug.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Error fetching data");
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Header pageName="Transportation" />

      <View style={styles.flatContainer}>
        <FlatList
          horizontal
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.box}
                onPress={() =>
                  navigation.navigate("ItemDetail", {
                    image: item.image,
                    name: item.name,
                    description: item.description,
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => navigation.navigate("ItemDetail", { 
                  image: item.image,
                  name: item.name,
                  description: item.description,})}
              >
                <Icon
                  name="map-marker"
                  size={15}
                  color="black"
                  style={{ paddingTop: 2, paddingRight: 5 }}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ede1d5",
    paddingTop: 30,
    justifyContent: "space-between",
  },
  flatContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ede1d5",
    paddingLeft: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 364,
    backgroundColor: "white",
    marginRight: 15,
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    borderWidth: 1,
    borderColor: "#3b3b3b",
    borderRadius: 45,
    width: 254,
    height: 50,
    backgroundColor: "#ede1d5",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    marginLeft: 10, // Resim ile metin arasında boşluk
    flexShrink: 1, // Uzun metinlerin taşmasını önlemek için
  },
  image: {
    width: 252,
    height: 363,
    borderRadius: 45,
  },
});

export default Transportation;

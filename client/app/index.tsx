import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);

  const { setToken, token, setIsLoggedIn, isLoggedIn } = useAuth();

  const clearAllData = async () => {
    try {
      await AsyncStorage.multiRemove(["accessToken", "isLoggedIn"]);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   getLoggedInKey();
  //   // clearAllData();
  // }, []);

  useEffect(() => {
    const getLoggedInKey = async () => {
      try {
        const value = await AsyncStorage.getItem("isLoggedIn");
        const accessToken = await AsyncStorage.getItem("accessToken");

        setIsLoggedIn(value === "true" ? true : false);
        setToken(accessToken!); // Update token within useEffect

        if (accessToken) {
          // console.log("Token set in context");
          // console.log("\nToken: ", accessToken, "\n");
          setLoggedInStatus(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLoggedInKey();

    // clearAllData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Image style={styles.image} source={require("../assets/images/BabyHead.png")} />
      {loggedInStatus ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => router.replace("/home/")}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/SignInModal")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#404ae3" }]}
            onPress={() => router.push("/SignUpModal")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  safeAreaContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#21db84",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

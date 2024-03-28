import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${process.env.EXPO_PUBLIC_API_URL}/api/users/signout`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status === 200) {
        setToken("");
        setIsLoggedIn(false);

        await AsyncStorage.multiRemove(["accessToken", "isLoggedIn"]);

        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <Text>SettingsPage</Text>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <CustomButton
          isLoading={isLoading}
          onPress={handleLogout}
          title="Logout"
          backgroundColor="#fc0352"
        />
      </View>
    </ScrollView>
  );
}

function useDynamicStyles(width: number, height: number) {
  return StyleSheet.create({});
}

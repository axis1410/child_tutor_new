import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SettingsPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    const getUserDetails = async () => {
      console.log("Fetching user details");
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserId(response.data.data.id);
        setEmail(response.data.data.email);
        setFullName(response.data.data.fullName);

        console.log(fullName);
      } catch (error) {
        console.log(error);
      }
    };

    getUserDetails();
  }, []);

  return (
    <View>
      <Text>SettingsPage</Text>
    </View>
  );
}

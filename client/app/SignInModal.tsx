import CustomInput from "@/components/CustomInput";
import { EMAIL_REGEX } from "@/constants/EmailRegEx";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { fetchUserDetails } from "@/utils/fetchUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

type FormFields = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { height, width } = useWindowDimensions();
  const styles = useDynamicStyles(width, height);

  const { setToken, token } = useAuth();
  const { setId, setEmail, setFullName, setIsVerified } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const pwd = watch("password");

  const storeAccessToken = async (token: string) => {
    console.log("Received token: ", token);
    try {
      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));

      console.log("Data stored locally");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FormFields) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };

    try {
      console.log("Sending api request");
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/users/signin`,
        requestData
      );

      // console.log("Access token: ", response.data.data.accessToken);
      // console.log(response.data.data.refreshToken);

      const accessToken = response.data.data.accessToken;

      storeAccessToken(accessToken);
      setToken(accessToken);
      const userDetails = await fetchUserDetails(accessToken);

      setId(userDetails?.id!);
      setEmail(userDetails?.email!);
      setFullName(userDetails?.fullName!);

      alert("Login successful");

      router.replace("/home/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.heading}>Login to Junior Junction</Text>
        <CustomInput
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
          }}
          control={control}
          autoCapitalize="none"
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <CustomInput
          name="password"
          rules={{
            required: "Password is required",
          }}
          control={control}
          autoCapitalize="none"
          placeholder="Enter password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/SignUpModal")}>
          <Text style={{ color: "blue", marginTop: 20 }}>New user? Register here</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function useDynamicStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: 32,
      marginBottom: 20,
      fontWeight: "bold",
    },
    textInput: {
      backgroundColor: "#f3f3f3",
      width: width * 0.8,
      height: 50,
      marginBottom: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
    },
    button: {
      marginTop: 5,
      backgroundColor: "#21db84",
      borderRadius: 10,
      padding: 10,
      width: width * 0.8,
      alignItems: "center",
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
    },
  });
}

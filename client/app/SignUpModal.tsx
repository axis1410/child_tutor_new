import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { EMAIL_REGEX } from "@/constants/EmailRegEx";
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
  confirmPassword: string;
  fullName: string;
  childName: string;
  childAge: number;
};

export default function SignUpModal() {
  const { height, width } = useWindowDimensions();
  const styles = useDynamicStyles(width, height);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const pwd = watch("password");

  const onSubmit = async (data: FormFields) => {
    const requestData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      childName: data.childName,
      childAge: data.childAge,
    };

    try {
      console.log("Sending api request");
      setIsLoading(true);
      console.log("loading: ", isLoading);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/users/signup`,
        requestData
      );

      console.log(response.data);

      alert("Registration successful. Please click on the verification link sent to your email");

      // router.replace("/(tabs)/auth/signin");
      router.replace("/SignInModal");
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
        <Text style={styles.heading}>Create an account</Text>
        <CustomInput
          rules={{ required: "Name is required" }}
          name="fullName"
          control={control}
          autoCapitalize="words"
          placeholder="Enter full name"
        />
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          control={control}
          autoCapitalize="none"
          placeholder="Enter password"
          secureTextEntry
        />
        <CustomInput
          name="confirmPassword"
          rules={{
            required: "Confirm password is required",
            validate: (value: string) => value === pwd || "Passwords do not match",
          }}
          control={control}
          autoCapitalize="none"
          placeholder="Confirm password"
          secureTextEntry
        />
        <CustomInput
          name="childName"
          rules={{ required: "Child's name is required" }}
          control={control}
          autoCapitalize="words"
          placeholder="Enter child's name"
        />
        <CustomInput
          name="childAge"
          rules={{ required: "Child's age is required" }}
          control={control}
          autoCapitalize="none"
          placeholder="Enter child's age"
          // @ts-ignore
          keyboardType="number-pad"
        />
        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity> */}
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title="Register"
          backgroundColor="#404ae3"
          isLoading={isLoading}
        />

        <TouchableOpacity onPress={() => router.replace("/SignInModal")}>
          <Text style={{ color: "blue", marginTop: 20 }}>Already have an account? Sign in</Text>
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

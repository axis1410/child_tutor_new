import React from "react";
import { Controller } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

interface CustomInputProps {
  control: any;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  placeholder: string;
  name: string;
  rules?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export default function CustomInput({
  control,
  secureTextEntry,
  autoCapitalize,
  placeholder,
  name,
  rules = {},
  keyboardType,
}: CustomInputProps) {
  const { height, width } = useWindowDimensions();
  const styles = useDynamicStyles(width, height);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? "#f55142" : "transparent" }]}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#424242"
              keyboardType={keyboardType}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message || "Error"}</Text>}
        </>
      )}
    />
  );
}

function useDynamicStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 15,
      marginVertical: 5,
    },

    textInput: {
      backgroundColor: "#f3f3f3",
      width: width * 0.8,
      height: 50,
      paddingHorizontal: 20,
      borderRadius: 15,
    },
    button: {
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
    errorText: {
      color: "#f55142",
      alignSelf: "stretch",
      fontStyle: "italic",
    },
  });
}

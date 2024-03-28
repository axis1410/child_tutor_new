import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

interface CustomButtonProps {
  backgroundColor?: string;
  onPress: () => void;
  title: string;
  isLoading?: boolean;
}

export default function CustomButton({
  backgroundColor,
  onPress,
  title,
  isLoading,
}: CustomButtonProps) {
  const { width, height } = useWindowDimensions();

  const styles = useDynamicStyles(width, height, backgroundColor);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

function useDynamicStyles(width: number, height: number, backgroundColor: string = "#21db84") {
  return StyleSheet.create({
    button: {
      marginTop: 5,
      backgroundColor: backgroundColor,
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

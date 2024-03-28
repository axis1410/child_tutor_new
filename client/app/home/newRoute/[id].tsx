import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TestingNewRoute() {
  const { id } = useLocalSearchParams();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses/${id}`);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>TestingNewRoute</Text>
      <CustomButton title="Get course by id" onPress={handleSubmit} />
    </View>
  );
}

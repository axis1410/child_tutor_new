import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function TestingNewRoute() {
  const { id } = useLocalSearchParams();

  const [courseData, setCourseData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses/${id}`);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(true);
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses/${id}`);

      console.log("Response Data: ", response.data);

      if (response.status === 200) {
        setCourseData(response.data);

        console.log(courseData[0].title);

        setLoading(false);
      }
    };

    getCourseData();
  }, []);

  return (
    <View>
      {!loading && <Text>{courseData[0].category}</Text>}
      {loading ? <Text>Loading...</Text> : <Text>{courseData[0].title}</Text>}
      {/* <Text>{courseData}</Text> */}
      {/* <CustomButton title="Get course by id" onPress={handleSubmit} /> */}
    </View>
  );
}

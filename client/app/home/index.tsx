import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function HomePage() {
  const [courseList, setCourseList] = useState<any[]>([]);
  const [dailyWord, setDailyWord] = useState("");
  const [dailyWordMeaning, setDailyWordMeaning] = useState("");
  const [dailyWordExample, setDailyWordExample] = useState("");

  const { setToken, setIsLoggedIn, token } = useAuth();
  const { fullName } = useUser();

  const { width, height } = useWindowDimensions();

  const styles = useDynamicStyles(width, height);

  const handleGoToCourse = async (courseId: number) => {
    // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses/${courseId}`);

    // console.log(response.data);

    router.push({ pathname: "/home/newRoute/[id]", params: { id: courseId } });
  };

  const handleLogout = async () => {
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
  };

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      console.log("Fetching word of the day");
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/word/current`);

        setDailyWord(response.data.word);
        setDailyWordMeaning(response.data.meaning);
        setDailyWordExample(response.data.example);
      } catch (error) {
        console.log(error);
      }
    };

    const handleFetchCourses = async () => {
      console.log("Seinding course fetch request");
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setCourseList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWordOfTheDay();
    handleFetchCourses();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading, { fontSize: 44 }]}>Hello {fullName}</Text>
      <Text style={styles.heading}>Word of the Day</Text>
      <Text style={styles.subHeading}>{dailyWord}</Text>
      <Text style={styles.subHeading}>{dailyWordMeaning}</Text>
      <Text style={styles.subHeading}>{dailyWordExample}</Text>

      <View style={styles.divider} />

      <Text style={styles.heading}>Learn</Text>

      {courseList.map((course: any) => {
        return (
          <TouchableOpacity onPress={() => handleGoToCourse(course.id)} key={course.id}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{course.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={styles.divider} />

      <Text style={styles.heading}>Tests</Text>

      <View style={styles.divider} />

      <Text style={styles.heading}>Progress</Text>

      <View style={styles.divider} />

      <Text style={styles.heading}>Settings</Text>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <CustomButton onPress={handleLogout} title="Logout" backgroundColor="#fc0352" />
      </View>
    </ScrollView>
  );
}

function useDynamicStyles(width: number, height: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
      fontSize: 32,
      fontWeight: "bold",
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    subHeading: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
    card: {
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: "white",
      borderRadius: 10,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    divider: {
      height: 1,
      backgroundColor: "black",
      marginHorizontal: 10,
      opacity: 0.5,
      marginTop: 10,
      marginBottom: 10,
    },
    settingsButton: {},
  });
}

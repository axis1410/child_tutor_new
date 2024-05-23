import axios from "axios";
import React, { useEffect } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const Alpha = () => {
  const [array, setArray] = React.useState(0);
  // JSON.parse(data.data);   you need to parse the stringified data to JSON which is coming from the backend

  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     const req = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/courses`);

  //     console.log(req.data);
  //   };

  //   fetchRequest();
  // }, []);

  const arr = [
    {
      Alphabet: "A",
      Image: require("../assets/Apple.png"),
      Text: "Apple",
    },
    {
      Alphabet: "B",
      Image: require("../assets/Ball.png"),
      Text: "Ball",
    },
  ];
  const increment = () => {
    if (array < arr.length - 1) setArray(array + 1);

    // console.log(array);
  };
  const decrement = () => {
    if (array > 0) setArray(array - 1);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.heading}>{arr[array].Alphabet}</Text>
          <View style={styles.container}>
            <Pressable
              onPress={() => {
                decrement();
              }}
            >
              <Image
                style={{
                  resizeMode: "center",
                  width: 50,
                  height: 50,
                  flexDirection: "row",
                }}
                source={require("../assets/leftArrow.png")}
              />
            </Pressable>
            <Image source={arr[array].Image} style={styles.iconImage} />
            <Pressable onPress={increment}>
              <Image
                style={{
                  resizeMode: "center",
                  width: 50,
                  height: 50,
                  flexDirection: "row",
                }}
                source={require("../assets/rightArrow.png")}
              />
            </Pressable>
          </View>
          <Text style={styles.subHeading}>{arr[array].Text}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  round: {
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  heading: {
    fontSize: 150,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 60,
    marginTop: 100,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  display: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Alpha;

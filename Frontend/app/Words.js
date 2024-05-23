import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

const Num = () => {
  const [array, setArray] = React.useState(0);

  const arr = [
    {
      Word: "Agile",
      Text: "quick or fast in movements",
    },
    {
      Word: "Barge",
      Text: "to interrupt rudely or clumsily",
    },
    {
      Word: "Create",
      Text: "to cause something new to happen or exist",
    },
    {
      Word: "Dauntless",
      Text: "incapable of being intimidated or subdued : fearless",
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
        <View style={styles.container}>
          <View style={styles.upperHalf}>
            <Text>{arr[array].Word}</Text>
          </View>
          <View style={styles.lowerHalf}>
            <Text>{arr[array].Text}</Text>
          </View>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upperHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  lowerHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  spellingText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Num;

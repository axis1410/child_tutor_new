import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { user } from "./userProfile";

const Index = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("Courses");

  return (
    <View style={styles.container}>
      {selectedOption === "Courses" && (
        <>
          <View style={styles.header}>
            <Text style={[styles.wordOfDay, styles.wordOfDayContainer]}>
              Word of the Day: Perspicacious
            </Text>
            <Text style={[styles.meaning, styles.meaningCard, styles.meaningText]}>
              Having a keen understanding and insight; able to notice and understand things that are
              not immediately apparent.
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <Card style={styles.card}>
              <Link href="/alphabet">
                <Text style={styles.cardText}>Alphabets (Eng)</Text>
              </Link>
            </Card>
            <Card style={styles.card}>
              <Link href="/Numbers">
                <Text style={styles.cardText}>Numbers</Text>
              </Link>
            </Card>
            <Card style={styles.card}>
              <Link href="/Words">
                <Text style={styles.cardText}>Words</Text>
              </Link>
            </Card>
          </View>
        </>
      )}
      {selectedOption === "Tests" && (
        <View style={styles.middleContainer}>
          <Card style={styles.card}>
            <Link href="/alphabetsQuiz">
              <Text style={styles.cardText}>Alphabets's Quiz</Text>
            </Link>
          </Card>
          <Card style={styles.card}>
            <Link href="/numbersQuiz">
              <Text style={styles.cardText}>Number's Quiz</Text>
            </Link>
          </Card>
          <Card style={styles.card}>
            <Link href="/wordsQuiz">
              <Text style={styles.cardText}>Word's Quiz</Text>
            </Link>
          </Card>
        </View>
      )}

      {selectedOption === "Profile" && (
        <View style={styles.container}>
          <View style={styles.cardprofile}>
            <Text style={styles.label}>
              Email id: <Text style={styles.value}>{user.email}</Text>
            </Text>

            <Text style={styles.label}>
              Parent's name: <Text style={styles.value}>{user.parentName}</Text>
            </Text>

            <Text style={styles.label}>
              Child's name: <Text style={styles.value}>{user.childName}</Text>
            </Text>

            <Text style={styles.label}>
              Child's age: <Text style={styles.value}>{user.childAge}</Text>
            </Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={() => console.log("Logout pressed")}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => setSelectedOption("Courses")}
        >
          <Text style={styles.bottomBarText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => setSelectedOption("Tests")}>
          <Text style={styles.bottomBarText}>Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => setSelectedOption("Profile")}
        >
          <Text style={styles.bottomBarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccf9ff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  wordOfDayContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  wordOfDay: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "skyblue",
  },
  meaningContainer: {
    marginBottom: 20,
  },
  meaningCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "pink",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  meaningText: {
    fontSize: 16,
    color: "#333",
  },
  middleContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "lightgreen",
    shadowColor: "lightblue",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "lightpink",
  },
  bottomBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  bottomBarText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  cardprofile: {
    width: "auto",
    backgroundColor: "lightgreen",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff69b4",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
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
});

export default Index;

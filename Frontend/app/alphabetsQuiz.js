import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AlphabetQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(true);

  const questions = [
    {
      question: "Find B.",
      options: [
        { option: "B", correct: true },
        { option: "Y", correct: false },
        { option: "K", correct: false },
        { option: "O", correct: false },
      ],
    },
    {
      question: "Find R.",
      options: [
        { option: "A", correct: false },
        { option: "S", correct: false },
        { option: "R", correct: true },
        { option: "K", correct: false },
      ],
    },
    {
      question: "Find Z.",
      options: [
        { option: "N", correct: false },
        { option: "S", correct: false },
        { option: "Z", correct: true },
        { option: "X", correct: false },
      ],
    },
  ];

  const increment = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const decrement = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option.correct) {
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <>
            <View style={styles.upperHalf}>
              <Text style={styles.questionText}>
                {questions[currentQuestion].question}
              </Text>
            </View>
            <View style={styles.cover}>
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
            <View style={styles.lowerHalf}>
              {questions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    selectedOption === option && option.correct ? styles.correctOption : null,
                    selectedOption === option && !option.correct ? styles.incorrectOption : null,
                    styles.optionCard
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option
                        ? styles.selectedOptionText
                        : {},
                    ]}
                  >
                    {option.option}
                  </Text>
                </Pressable>
              ))}
            </View>
            {showCorrectAnswer && (
              <View style={styles.bottomBar}>
                <Text style={styles.bottomBarText}>
                  <Text>Choose The Correct option</Text>
                </Text>
              </View>
            )}
            {!showCorrectAnswer && (
              <View style={styles.bottomBar}>
                <Text style={styles.bottomBarText}>Correct Answer</Text>
              </View>
            )}
          </>
        </View>
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
  cover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  upperHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  lowerHalf: {
    // flex: 1,
    marginTop: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 120,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  optionCard: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: "black",
  },
  selectedOptionText: {
    color: "orange",
    fontWeight: "bold",
  },
  correctOption: {
    backgroundColor: "red",
    color: "red",
    fontWeight: "bold",
  },
  incorrectOption: {
    backgroundColor: "red",
  },
  bottomBar: {
    backgroundColor: "gray",
    padding: 10,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarText: {
    fontSize: 18,
    color: "white",
  },
});

export default AlphabetQuizPage;

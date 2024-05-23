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

const WordQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const questions = [
    {
      question: "Find:  eat.",
      options: [
        { option: "eat", correct: true },
        { option: "EaT", correct: false },
        { option: "ate", correct: false },
        { option: "South", correct: false },
      ],
    },
    {
      question: "Find:  Play.",
      options: [
        { option: "PLayed", correct: false },
        { option: "Sleep", correct: false },
        { option: "Play", correct: true },
        { option: "PlaY", correct: false },
      ],
    },
    {
      question: "Find:  ElepHant.",
      options: [
        { option: "Lion", correct: false },
        { option: "Monkey", correct: false },
        { option: "Elephant", correct: true },
        { option: "Boar", correct: false },
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
            <View style={styles.lowerHalf}>
              {questions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.optionCard,
                    selectedOption === option
                      ? option.correct
                        ? styles.correctOption
                        : styles.incorrectOption
                      : {},
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
                  <Text>Wrong Answer{"\n"}</Text>
                  The correct answer should be:{" "}
                  {
                    questions[currentQuestion].options.find(
                      (option) => option.correct
                    ).option
                  }
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
  questionText: {
    fontSize: 24,
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
    color: "black",
  },
  correctOption: {
    backgroundColor: "green",
  },
  incorrectOption: {
    backgroundColor: "red",
  },
  bottomBar: {
    backgroundColor: "gray",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarText: {
    fontSize: 18,
    color: "white",
  },
});

export default WordQuizPage;

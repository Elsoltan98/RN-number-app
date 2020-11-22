import React, { useState, useRef, useEffect } from "react";

import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const generatedRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generatedRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderList = (value, numOfIndex) => {
  return (
    <View key={value * (Math.random() * 100)} style={styles.listItem}>
      <Text>#{numOfIndex}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initalState = generatedRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initalState);
  const [avilableWidth, setAvilableWidth] = useState(
    Dimensions.get("window").width
  );
  const [avilableHeight, setAvilableHeight] = useState(
    Dimensions.get("window").height
  );
  const [pastGuess, setPastGuess] = useState([initalState]);
  const currentHigh = useRef(100);
  const currentLow = useRef(1);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", "You Know that this is wrong", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generatedRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    // setRounds((curRound) => curRound + 1);
    setPastGuess((curPastGuess) => [nextNumber, ...curPastGuess]);
  };

  useEffect(() => {
    const updateLayout = () => {
      setAvilableWidth(Dimensions.get("window").width);
      setAvilableHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  if (Dimensions.get("window").height < 350) {
    return (
      <View style={styles.screen}>
        <Title>Opponent's Guess</Title>

        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <MaterialIcons name="remove" size={24} color="black" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Entypo name="plus" size={24} color="black" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess, index) =>
              renderList(guess, pastGuess.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <MaterialIcons name="remove" size={24} color="black" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Entypo name="plus" size={24} color="black" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderList(guess, pastGuess.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    marginTop: Dimensions.get("window").height > 600 ? 30 : 5,
    maxWidth: "80%",
  },
  listContainer: {
    width: Dimensions.get("window").width > 500 ? "60%" : "80%",
    flex: 1,
  },
  list: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GameScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Color from "./../constans/colors";
import NumberContainer from "./../components/NumberContainer";
import BodyText from "./../components/BodyText";
import Title from "./../components/Title";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    let numberDivide = 3;
    if (Dimensions.get("window").width > 350) {
      numberDivide = 4;
    }
    const outputLayout = () => {
      setButtonWidth(Dimensions.get("window").width / numberDivide);
    };

    Dimensions.addEventListener("change", outputLayout);

    return () => {
      Dimensions.removeEventListener("change", outputLayout);
    };
  });

  const getInputValue = (number) => {
    setEnteredValue(number);
  };

  const resetInputValue = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const number = parseInt(enteredValue);
    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Number has to be a number between 1 to 99."),
        [{ text: "Okay", style: "destructive", onPress: resetInputValue }];
      return;
    }

    setConfirmed(true);
    setSelectedNumber(number);
    setEnteredValue("");
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>Your Selected</BodyText>
        <View>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton onPress={() => props.onStartGame(selectedNumber)}>
            Start Game
          </MainButton>
        </View>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Title style={styles.title}>Start A New Game</Title>
            <Card style={styles.inputContainer}>
              <BodyText>Type A Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={getInputValue}
                value={enteredValue}
              />

              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    onPress={resetInputValue}
                    title="Reset"
                    color={Color.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    onPress={confirmHandler}
                    title="Confirm"
                    color={Color.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    minWidth: 300,
    width: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  // button: {
  //   //width: 100,
  //   width: Dimensions.get("window").width / 3,
  // },
  input: {
    textAlign: "center",
    width: 30,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;

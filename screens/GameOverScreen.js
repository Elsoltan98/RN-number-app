import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Title from "../components/Title";
import colors from "../constans/colors";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Title>The Game Over...!</Title>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./../assets/success.png")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highLight}>{props.userRounds}</Text> to guess
            the number <Text style={styles.highLight}>{props.userNumber}</Text>
          </BodyText>
        </View>

        <MainButton onPress={props.onNewGame}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderColor: "black",
    overflow: "hidden",
    borderWidth: 3,
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 20 : 16,
  },
  highLight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constans/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.accent,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 22,
    color: colors.accent,
  },
});

export default NumberContainer;

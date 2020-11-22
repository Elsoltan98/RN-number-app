import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Color from "./../constans/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    backgroundColor: Color.primary,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "black",
    fontFamily: "open-sans-bold",
  },
});

export default Header;

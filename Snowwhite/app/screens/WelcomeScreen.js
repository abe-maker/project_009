import React from "react";
import { StyleSheet, View } from "react-native-web";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.loginButton}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
  },
});

export default WelcomeScreen;

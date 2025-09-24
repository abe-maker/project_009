import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import styles from "../config/styles";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.schriftzug}>
        <Text style={styles.schriftzugtext}>SNOWWHITE</Text>
      </View>
      <View style={styles.blackfiller}></View>
      <View style={styles.loginstuff}>
        <View style={styles.surname}>
          <Text>Surname</Text>
          <TextInput style={styles.surnameinput}></TextInput>
        </View>
        <View style={styles.familyname}>
          <Text>Familyname</Text>
          <TextInput style={styles.familynameinput}></TextInput>
        </View>
        <View style={styles.loginButton}>
          <Button
            title="Lets Start!"
            onPress={() => Alert.alert("Lets start")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  schriftzug: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  schriftzugtext: {
    fontSize: 60,
  },
  blackfiller: {
    width: "100%",
    height: "10%",
    backgroundColor: "black",
  },
  loginstuff: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    alignItems: "center",
  },
  surname: {
    width: "100%",
    height: "40%",
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  surnameinput: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  familyname: {
    width: "100%",
    height: "40%",
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  familynameinput: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    width: "30%",
    height: "20%",
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default WelcomeScreen;

// app/screens/MainScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import SwipeWrapper from "../components/SwipeWrapper";
import { getHighscores, updateHighscore } from "../lib/api";

export default function MainScreen({ route, navigation }) {
  const { user } = route.params;
  const [currentScore, setCurrentScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    loadHighscores();
  }, []);

  const loadHighscores = async () => {
    try {
      const list = await getHighscores();
      const currentUser = list.documents.find(
        (h) => h.surname === user.surname && h.familyname === user.familyname
      );
      if (currentUser) {
        setCurrentScore(currentUser.score || 0);
        setLastScore(currentUser.lastScore || 0);
      }
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  const handleStartGame = async () => {
    const newScore = currentScore + 10; // Beispiel: Score erhöhen
    try {
      await updateHighscore(user.$id, {
        score: newScore,
        lastScore: currentScore,
      });
      setLastScore(currentScore);
      setCurrentScore(newScore);
      Alert.alert("Spiel gestartet!", `Neuer Score: ${newScore}`);
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  return (
    <SwipeWrapper navigation={navigation} user={user}>
      <View style={styles.container}>
        <Text style={styles.title}>SNOWWHITE</Text>
        <Text style={styles.welcome}>
          Willkommen, {user.surname} {user.familyname}!
        </Text>
        <Button title="Spiel starten" onPress={handleStartGame} />
        <Text style={styles.score}>
          Aktueller Highcore: {currentScore} | Letzter Score: {lastScore}
        </Text>
      </View>
    </SwipeWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 60, fontWeight: "bold", marginBottom: "70%" },
  welcome: { fontSize: 22, marginBottom: "5%" },
  score: { fontSize: 18, marginTop: "30%" },
});

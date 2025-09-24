import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { getHighscores, updateHighscore } from "../lib/api";

export default function MainScreen({ route, navigation }) {
  const { user } = route.params;
  const [currentScore, setCurrentScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [userDocId, setUserDocId] = useState(null);

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
        setUserDocId(currentUser.$id);
      }
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  const handleStartGame = async () => {
    if (!userDocId) return Alert.alert("Fehler", "Benutzer nicht gefunden!");
    const newScore = currentScore + 10;

    try {
      await updateHighscore(userDocId, {
        score: newScore,
        lastScore: currentScore,
      });
      setLastScore(currentScore);
      setCurrentScore(newScore);
      Alert.alert("Spiel gestartet!", `Score +10! Neuer Score: ${newScore}`);
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  const handlePersonalScores = () => {
    navigation.navigate("Highscores", { user });
  };

  const handleGlobalLeaderboard = () => {
    navigation.navigate("Leaderboard");
  };

  // Swipe-Gesten
  const onSwipeLeft = () => {
    navigation.navigate("Highscores", { user });
  };

  const onSwipeRight = () => {
    navigation.navigate("Leaderboard");
  };

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    >
      <Text style={styles.title}>SNOWWHITE</Text>
      <Text style={styles.welcome}>
        Willkommen, {user.surname} {user.familyname}!
      </Text>

      <Button title="Spiel starten" onPress={handleStartGame} />
      <Text style={styles.score}>
        Aktueller Score: {currentScore} | Letzter Score: {lastScore}
      </Text>

      {/* Unteres Menü */}
      <View style={styles.menu}>
        <TouchableOpacity onPress={handleGlobalLeaderboard}>
          <Text style={styles.menuText}>🌐</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled>
          <Text style={styles.menuText}>🎮</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePersonalScores}>
          <Text style={styles.menuText}>⭐</Text>
        </TouchableOpacity>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 60, fontWeight: "bold", marginBottom: 20 },
  welcome: { fontSize: 22, marginBottom: 20 },
  score: { fontSize: 18, marginTop: 20 },
  menu: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    width: "80%",
    justifyContent: "space-around",
  },
  menuText: { fontSize: 30 },
});

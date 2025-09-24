// app/screens/HighscoreScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import SwipeWrapper from "../components/SwipeWrapper";
import { getHighscores } from "../lib/api";

export default function HighscoreScreen({ route, navigation }) {
  const { user } = route.params;
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    loadHighscores();
  }, []);

  const loadHighscores = async () => {
    try {
      const list = await getHighscores();
      const userScores = list.documents
        .filter(
          (h) => h.surname === user.surname && h.familyname === user.familyname
        )
        .sort((a, b) => b.score - a.score);
      setHighscores(userScores);
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {index + 1}. Score: {item.score} –{" "}
        {new Date(item.$createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SwipeWrapper navigation={navigation} user={user}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {user.surname} {user.familyname} – Highscores
        </Text>
        <FlatList
          data={highscores}
          keyExtractor={(item) => item.$id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SwipeWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: { fontSize: 18 },
});

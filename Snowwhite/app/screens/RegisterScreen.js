import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser } from "../lib/api";

export default function RegisterScreen({ navigation }) {
  const [surname, setSurname] = useState("");
  const [familyname, setFamilyname] = useState("");

  const handleRegister = async () => {
    try {
      if (!surname || !familyname) {
        Alert.alert("Fehler", "Bitte alle Felder ausfüllen!");
        return;
      }

      await registerUser(surname, familyname);

      // Navigation zur MainScreen mit Benutzerinfo
      navigation.replace("Main", { user: { surname, familyname } });
    } catch (err) {
      Alert.alert("Fehler", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.schriftzug}>SNOWWHITE</Text>
      <Text style={styles.title}>What´s your name?</Text>

      <TextInput
        placeholder="Vorname"
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
      />
      <TextInput
        placeholder="Nachname"
        value={familyname}
        onChangeText={setFamilyname}
        style={styles.input}
      />

      <Button title="Lets Play!" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  schriftzug: { fontSize: 60, textAlign: "center", marginBottom: "40%" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
});

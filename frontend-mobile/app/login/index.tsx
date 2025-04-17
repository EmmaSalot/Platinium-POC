"use client";

import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { login } from "platinium_services";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await login(username, password);
      console.log("Token:", data.token);
      // Ici tu peux stocker le token via AsyncStorage si besoin
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Identifiant"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#002D62" />
      ) : (
        <Button title="Se connecter" onPress={handleLogin} />
      )}

      {errorMessage.length > 0 && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#002D62",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
"use client";

import { useState } from "react";
import { useRouter } from "expo-router";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { login } from "platinium_services";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await login(username, password);
      console.log("Token:", data.token);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View style={styles.loginCard}>
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoText}>PLATINIUM BANQUE</Text>
        </View>

        <View style={styles.bankIcon}>
          <View style={styles.bankRoof}></View>
          <View style={styles.bankBuilding}></View>
          <View style={styles.bankDoor}></View>
          <View style={styles.bankSteps}></View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Bienvenue</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Connectez-vous à votre espace bancaire
        </Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Identifiant</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Entrez votre identifiant"
            placeholderTextColor={colors.icon}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Mot de passe</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Entrez votre mot de passe"
            placeholderTextColor={colors.icon}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Accéder à mon compte</Text>
          )}
        </TouchableOpacity>

        {errorMessage ? (
          <View style={[styles.errorContainer, { backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            Vous avez oublié vos identifiants ?{" "}
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Cliquez ici
            </Text>
          </Text>
          <Text style={[styles.footerText, { color: colors.text, marginTop: 10 }]}>
            Première connexion ?{" "}
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Activer mon compte
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  loginCard: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    borderRadius: 4,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  bankIcon: {
    alignSelf: "center",
    marginBottom: 20,
    width: 80,
    height: 80,
    alignItems: "center",
  },
  bankRoof: {
    width: 60,
    height: 20,
    backgroundColor: "#CCCCCC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bankBuilding: {
    width: 50,
    height: 40,
    backgroundColor: "#DDDDDD",
  },
  bankDoor: {
    width: 20,
    height: 25,
    backgroundColor: "#888888",
    marginTop: -25,
  },
  bankSteps: {
    width: 40,
    height: 5,
    backgroundColor: "#AAAAAA",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
  },
  footerLink: {
    fontWeight: "500",
  },
});
"use client";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur le Dashboard 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "#002D62",
  },
});
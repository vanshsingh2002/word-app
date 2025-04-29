import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "@/context/ThemeContext";

function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Dark Mode</Text>
        <Switch
          value={theme.isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={theme.isDarkMode ? theme.primary : "#f4f3f4"}
          trackColor={{ false: "#767577", true: theme.primary }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    // borderWidth: 1,
    // borderColor: "red",
  },
  card: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from "@/constants/wordOfTheDay.json";
import { useTheme } from "@/context/ThemeContext";

export function HistorySection() {
  const { theme } = useTheme();
  const now: Date = new Date();
  const startOfYear: Date = new Date(now.getFullYear(), 0, 1);
  const diff: number = now.getTime() - startOfYear.getTime();
  const dayOfYear: number = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <View style={[styles.historyContainer, { backgroundColor: theme.cardBg }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Last 5 Words of the Day
      </Text>
      <FlatList
        data={data.slice(dayOfYear - 5, dayOfYear)}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Ionicons
              name="book-outline"
              size={20}
              color={theme.primary} // Icon color based on theme
              style={styles.icon}
            />
            <Text style={[styles.historyText, { color: theme.text }]}>
              {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  historyText: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    // color: "#333",
  },
});

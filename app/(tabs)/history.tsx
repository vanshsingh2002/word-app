import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useHistory } from "../../context/HistoryContext";
import { useTheme } from "@/context/ThemeContext";

export default function History() {
  const { history, clearHistory } = useHistory();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.word, { color: theme.primary }]}>
              {item.word.toUpperCase()}
            </Text>
            <Text style={[styles.definition, { color: theme.text }]}>
              {item.definition}
            </Text>
            <Text style={[styles.date, { color: theme.text }]}>
              {new Date(item.date || "").toLocaleDateString()}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", gap: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: {
    paddingHorizontal: 24,
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  word: { fontSize: 18, fontWeight: "bold" },
  definition: { fontSize: 14, color: "#555" },
  date: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  clearButton: {
    backgroundColor: "#6A5ACD",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    // marginTop: 16,
  },
  clearButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

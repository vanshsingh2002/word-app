import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import data from "@/constants/wordOfTheDay.json";
import { useTheme } from "@/context/ThemeContext";
import ErrorComponent from "@/components/General/ErrorComponent";
import { Word } from "@/app/(tabs)";

export default function WordOfDay() {
  const [loading, setLoading] = useState<boolean>();
  const { theme } = useTheme();
  const [error, setError] = useState<boolean>();
  const now: Date = new Date();
  const startOfYear: Date = new Date(now.getFullYear(), 0, 1);

  const diff: number = now.getTime() - startOfYear.getTime();
  const dayOfYear: number = Math.floor(diff / (1000 * 60 * 60 * 24));

  const [wordOfTheDay, setWordOfTheDay] = useState<Word>();

  const generateNewWord = async () => {
    const randomWord = data[dayOfYear % 365];
    try {
      setLoading(true);
      setError(true);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
      );
      const data = await response.json();
      const wordData = data[0];
      const newWord = {
        word: wordData.word,
        type: wordData.meanings[0]?.partOfSpeech || "unknown",
        definition:
          wordData.meanings[0]?.definitions[0]?.definition ||
          "No definition available.",
        example:
          `Example: ${wordData.meanings[0]?.definitions[0]?.example}` ||
          "Example: No example available.",
      };
      setWordOfTheDay(newWord);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  return (
    <View
      style={[styles.wordOfTheDayContainer, { backgroundColor: theme.cardBg }]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Word of the Day
      </Text>
      {loading && <ActivityIndicator />}
      {error ? (
        <View style={styles.placeholderContainer}>
          <ErrorComponent />
        </View>
      ) : (
        <>
          <Text style={[styles.word, { color: theme.primary }]}>
            {wordOfTheDay?.word.toLocaleUpperCase()}
          </Text>
          <Text style={[styles.type, { color: theme.primary }]}>
            {wordOfTheDay?.type}
          </Text>
          <Text style={[styles.definition, { color: theme.text }]}>
            {wordOfTheDay?.definition}
          </Text>
          <Text style={[styles.example, { color: theme.text }]}>
            {wordOfTheDay?.example}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
  wordOfTheDayContainer: {
    marginBottom: 0,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    // color: "#333",
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6A5ACD",
  },
  type: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#6A5ACD",
    marginBottom: 8,
  },
  definition: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 16,
  },
  newWordButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  newWordButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  weeklyRecapContainer: {
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wordItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  typeText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
  },
  definitionText: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

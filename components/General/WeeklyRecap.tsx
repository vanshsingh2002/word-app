import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from "@/constants/wordOfTheDay.json";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Word } from "@/app/(tabs)";

export function WeeklyRecap() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>();
  const [weeklyWords, setWeeklyWords] = useState<Word[]>([]);
  const now: Date = new Date();
  const startOfYear: Date = new Date(now.getFullYear(), 0, 1);

  const diff: number = now.getTime() - startOfYear.getTime();
  const dayOfYear: number = Math.floor(diff / (1000 * 60 * 60 * 24));

  const fetchWeeklyWords = async () => {
    setLoading(true);
    const words = data.slice(Math.max(0, dayOfYear - 7), dayOfYear).reverse(); // Get last 7 words
    const fetchedWords: Word[] = [];

    for (const word of words) {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = await response.json();
        const wordData = data[0];
        fetchedWords.push({
          word: wordData.word,
          type: wordData.meanings[0]?.partOfSpeech || "unknown",
          definition:
            wordData.meanings[0]?.definitions[0]?.definition ||
            "No definition available.",
          example:
            wordData.meanings[0]?.definitions[0]?.example ||
            "No example available.",
          synonyms: wordData.meanings[0]?.synonyms,
        });
      } catch (error) {
        fetchedWords.push({
          word,
          type: "unknown",
          definition: "Could not fetch definition.",
          example: "",
        });
      }
    }

    setWeeklyWords(fetchedWords);
    setLoading(false);
    return fetchedWords;
  };

  const loadWeeklyWords = async () => {
    try {
      const cachedWords = await AsyncStorage.getItem("weeklyWords");
      const lastUpdated = await AsyncStorage.getItem("lastUpdated");
      const currentDate = new Date().toISOString().split("T")[0];

      if (cachedWords && lastUpdated === currentDate) {
        setWeeklyWords(JSON.parse(cachedWords));
      } else {
        const newWords: Word[] | undefined = await fetchWeeklyWords();
        await AsyncStorage.setItem("weeklyWords", JSON.stringify(newWords));
        await AsyncStorage.setItem("lastUpdated", currentDate);
        setWeeklyWords(newWords);
      }
    } catch (error) {
      console.error("Error loading weekly words:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeeklyWords();
  }, []);

  return (
    <View
      style={[styles.weeklyRecapContainer, { backgroundColor: theme.cardBg }]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Weekly Recap
      </Text>
      <FlatList
        data={weeklyWords}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <Ionicons
              name="book-outline"
              size={20}
              color={theme.primary}
              style={styles.icon}
            />
            <View>
              <Text style={[styles.wordText, { color: theme.primary }]}>
                {item.word.charAt(0).toUpperCase() + item.word.slice(1)}
              </Text>
              <Text style={[styles.typeText, { color: theme.primary }]}>
                {item.type}
              </Text>
              <Text style={[styles.definitionText, { color: theme.text }]}>
                {item.definition} {item.synonyms}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No words available for the past week.
          </Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
  icon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    // color: "#333",
  },
});

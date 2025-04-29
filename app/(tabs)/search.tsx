import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useHistory } from "@/context/HistoryContext";
import { Ionicons } from "@expo/vector-icons";

type Word = {
  word: string;
  type: string;
  definition: string;
  example: string;
  date?: string;
  synonyms?: string[];
};

const SearchScreen = () => {
  const { theme } = useTheme();
  const { addWord } = useHistory();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [synLoading, setSynLoading] = useState<boolean>(false);
  const [wordOfTheDay, setWordOfTheDay] = useState<Word>();
  const [error, setError] = useState<string>("");
  const [synonymDetails, setSynonymDetails] = useState<Word[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  const fetchWordMeaning = async () => {
    if (!query) return; // Don't search if query is empty
    setLoading(true);
    setError("");
    setSynonyms([]);
    setSynonymDetails([]);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );

      if (!response.ok) {
        throw new Error("Word not found! Please try again.");
      }

      const data = await response.json();
      const wordData = data[0];
      const newWord = {
        word: wordData.word,
        type: wordData.meanings[0]?.partOfSpeech || "unknown",
        definition:
          wordData.meanings[0]?.definitions[0]?.definition ||
          "No definition available.",
        example:
          wordData.meanings[0]?.definitions[0]?.example ||
          "No example available.",
        synonyms: wordData.meanings[0]?.synonyms,
      };
      const newWordWithDate = { ...newWord, date: new Date().toISOString() };
      addWord(newWordWithDate);
      setWordOfTheDay(newWord);
      setSynonyms(newWord.synonyms);
      fetchDetailsForSynonyms(newWord.synonyms);
    } catch (err: any) {
      setError(err.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailsForSynonyms = async (synonymsList: string[]) => {
    const details: Word[] = [];
    setSynLoading(true);
    for (const synonym of synonymsList) {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${synonym}`
        );
        if (!response.ok) continue;

        const data = await response.json();
        const wordData = data[0];
        const synonymDetail = {
          word: wordData.word,
          type: wordData.meanings[0]?.partOfSpeech || "unknown",
          definition:
            wordData.meanings[0]?.definitions[0]?.definition ||
            "No definition available.",
          example:
            wordData.meanings[0]?.definitions[0]?.example ||
            "No example available.",
        };
        details.push(synonymDetail);
        setSynLoading(false);
      } catch (err) {
        setSynLoading(false);
      }
    }
    setSynonymDetails(details);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.subContainer]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBg,
                color: theme.text,
                flex: 1,
              },
            ]}
            placeholder="Search for a word..."
            placeholderTextColor={theme.text}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity
            onPress={fetchWordMeaning}
            style={styles.iconContainer}
          >
            <Ionicons name="search" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.primary} />
        </View>
      )}

      {error && (
        <View
          style={[
            styles.errorContainer,
            {
              backgroundColor: theme.cardBg,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Ionicons name="alert-circle" size={30} color="#D9534F" />
          <Text style={[styles.errorText, { color: theme.error }]}>
            {error}
          </Text>
        </View>
      )}

      {wordOfTheDay && (
        <View
          style={[
            styles.wordOfTheDayContainer,
            { backgroundColor: theme.cardBg },
          ]}
        >
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
            Example: {wordOfTheDay?.example}
          </Text>
        </View>
      )}
      {/* Synonym Details */}
      {synonymDetails.length > 0 && (
        <View>
          <Text
            style={[
              styles.word,
              {
                color: theme.text,
                textAlign: "left",
                marginBottom: 20,
                fontSize: 20,
              },
            ]}
          >
            Similar Words
          </Text>
          {synLoading && <ActivityIndicator />}
          {synonymDetails?.slice(0, 2).map((detail, index) => (
            <View
              key={index}
              style={[
                styles.wordOfTheDayContainer,
                { backgroundColor: theme.cardBg },
              ]}
            >
              <Text style={[styles.word, { color: theme.primary }]}>
                {detail.word.toLocaleUpperCase()}
              </Text>
              <Text style={[styles.type, { color: theme.primary }]}>
                {detail.type}
              </Text>
              <Text style={[styles.definition, { color: theme.text }]}>
                {detail.definition}
              </Text>
              <Text style={[styles.example, { color: theme.text }]}>
                Example: {detail.example}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Ensures proper spacing between items
    alignItems: "center", // Vertically center the elements
    marginBottom: 16,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    zIndex: 1, // Ensure the icon is on top of the input field
  },
  loadingContainer: {
    marginTop: 20,
  },
  wordOfTheDayContainer: {
    marginBottom: 24,
    width: "100%",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorContainer: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
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
});

export default SearchScreen;

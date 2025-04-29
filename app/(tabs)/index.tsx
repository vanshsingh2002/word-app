import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { WeeklyRecap } from "@/components/General/WeeklyRecap";
import WordOfDay from "@/components/General/wordOfDay";

export interface Word {
  word: string;
  type: string;
  definition: string;
  example: string;
  date?: string;
  synonyms?: string[];
}

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Word of the Day Section */}
      <WordOfDay />

      {/* History Section */}
      {/* <HistorySection /> */}

      {/* Weekly Recap */}
      <WeeklyRecap />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

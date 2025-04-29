import React, { createContext, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Word = {
  word: string;
  type: string;
  definition: string;
  example: string;
  date?: string;
};

type HistoryContextType = {
  history: Word[];
  addWord: (word: Word) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<Word[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("wordHistory");
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Error loading history from AsyncStorage:", error);
      }
    })();
  }, []);

  const addWord = async (word: Word) => {
    setHistory((prevHistory) => {
      const updatedHistory = [word, ...prevHistory];
      AsyncStorage.setItem("wordHistory", JSON.stringify(updatedHistory)); // Fire-and-forget
      return updatedHistory;
    });
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem("wordHistory");
  };

  return (
    <HistoryContext.Provider value={{ history, addWord, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};

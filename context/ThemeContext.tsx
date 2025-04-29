import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "../constants/themes";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemTheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
    if (theme === lightTheme) {
      Appearance.setColorScheme("dark");
    } else Appearance.setColorScheme("light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

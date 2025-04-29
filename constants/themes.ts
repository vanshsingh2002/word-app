export interface Theme {
  background: string;
  backgroundColor: string;
  borderColor: string;
  text: string;
  primary: string;
  tint: string;
  tabBarBackground: string;
  tabIconActive: string;
  tabIconInactive: string;
  cardBg: string;
  button: string;
  isDarkMode: boolean;
  danger: string;
  error: string;
}

export const lightTheme: Theme = {
  background: "#FFFFFF",
  text: "#212121",
  tabBarBackground: "#F5F5F5",
  tabIconActive: "#6200EE",
  tabIconInactive: "#959595",
  tint: "#6200EE",
  primary: "#6200EE",
  cardBg: "#f9f9f9",
  button: "#6200EE",
  isDarkMode: false,
  danger: "#6200EE",
  backgroundColor: "#F0D1FF",
  borderColor: "#D9534F",
  error: "#D9534F",
};

export const darkTheme: Theme = {
  background: "#121212",
  text: "#E0E0E0",
  tint: "#BB86FC",
  primary: "#BB86FC",
  tabBarBackground: "#1E1E1E",
  tabIconActive: "#BB86FC",
  tabIconInactive: "#8E8E93",
  cardBg: "#2B2A2A",
  button: "#6200EE",
  isDarkMode: true,
  danger: "#6200EE",
  backgroundColor: "#2B2A2A",
  borderColor: "#F28D8C",
  error: "#F28D8C",
};

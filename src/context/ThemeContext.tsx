import { createContext } from "react";

export type Theme = "Light" | "Dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
export default ThemeContext;

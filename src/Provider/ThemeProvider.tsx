import { useEffect, useState, type PropsWithChildren } from "react";
import ThemeContext, {
  type Theme,
  type ThemeContextType,
} from "../context/ThemeContext";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    const theme = (localStorage.getItem("theme") as Theme) || "Light";
    if (theme === "Dark") document.body.classList.add("dark");

    return theme;
  });

  function toggleTheme() {
    document.body.classList.toggle("dark");
    setTheme((prev) => (prev === "Dark" ? "Light" : "Dark"));
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

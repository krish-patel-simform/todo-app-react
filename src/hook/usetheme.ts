import { useState } from "react";

type Theme = "Light" | "Dark";
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const theme = (localStorage.getItem("theme") as Theme) || "Light";
    if (theme === "Dark") document.body.classList.add("dark");

    return theme;
  });
  function toggleTheme() {
    document.body.classList.toggle("dark");
    const newTheme: Theme = theme === "Dark" ? "Light" : "Dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return { theme, toggleTheme };
}

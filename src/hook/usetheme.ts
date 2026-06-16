import { useState } from "react";

type Theme = "Light" | "Dark";
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("Light");
  function toggleTheme() {
    document.body.classList.toggle("dark");
    setTheme((prev) => (prev === "Dark" ? "Light" : "Dark"));
  }

  return { theme, toggleTheme };
}

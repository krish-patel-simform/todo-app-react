import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw Error("theme context does not exist");
  return context;
}

import { createContext } from "react";

export interface AppContextType {
  theme: "light" | "dark";
}

export const AppContext = createContext<AppContextType>({ theme: "light" });

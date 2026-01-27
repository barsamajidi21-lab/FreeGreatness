// LanguageContext.tsx
import { createContext } from "react";

export const LanguageContext = createContext({ 
  lang: "en", 
  setLang: (l: string) => {} 
});
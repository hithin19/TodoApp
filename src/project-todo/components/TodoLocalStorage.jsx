import { useEffect } from "react";

export const getLocalStorage = (key) => {
    try {
      const rawTodos = localStorage.getItem(key);
      return rawTodos ? JSON.parse(rawTodos) : [];
    } catch (error) {
      console.error("Error parsing todos:", error);
      return [];
    }
  };
  
  export const useLocalStorage = (key, state) => {
    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }, [key, state]);
  };
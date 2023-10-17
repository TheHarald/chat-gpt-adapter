"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

interface StoredObject {
  id: string;
}

const useLocalStorage = <T extends StoredObject>(
  key: string,
  initialValue: T[]
): [T[], SetValue<T[]>, (id: string) => void, (item?: T[]) => void] => {
  const isBrowser = typeof window !== "undefined";

  const initialize = () => {
    if (isBrowser) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  useEffect(() => {
    if (!isBrowser) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState<T[]>(() => initialValue);

  const deleteItemById = (id: string) => {
    const updatedValue = value.filter((item) => item.id !== id);
    setValue(updatedValue);
    isBrowser && localStorage.setItem(key, JSON.stringify(updatedValue));
  };

  const setStoredValue: SetValue<T[]> = (newValue) => {
    setValue(newValue);
    isBrowser && localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T[]);
      }
    }
  }, [key, isBrowser]);

  const addItem = (newItem?: T[]) => {
    if (!newItem) return;
    const updatedValue = [...value, ...newItem];
    setValue(updatedValue);
    if (typeof window === "undefined") return;
    isBrowser && localStorage.setItem(key, JSON.stringify(updatedValue));
  };

  return [value, setStoredValue, deleteItemById, addItem];
};

export default useLocalStorage;

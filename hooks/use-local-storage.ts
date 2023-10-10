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

  const storedValue = isBrowser ? localStorage.getItem(key) : null;
  const initial: T[] = storedValue
    ? (JSON.parse(storedValue) as T[])
    : initialValue;

  const [value, setValue] = useState<T[]>(initial);

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

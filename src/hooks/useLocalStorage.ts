import {Dispatch, SetStateAction, useEffect, useState} from "react";

const getArrayDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const useLocalStorage = <T>(key: string): [T[], Dispatch<SetStateAction<T[]>>] => {
  const [items, setItems] = useState<T[]>(getArrayDataFromLocalStorage(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  return [items, setItems];
};

export { useLocalStorage };

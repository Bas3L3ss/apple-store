import { useState, useEffect } from "react";

/*

How to use this hook:
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [example, setExample] = useLocalStorage('example_key', { example: 'anything as default' });

  return ();
};

*/

const getLsVal = (
  key: string,
  defaultValue: string | number | boolean | null
) => {
  const storedStr = localStorage.getItem(key) || "";

  if (storedStr) {
    return JSON.parse(storedStr);
  } else {
    return defaultValue;
  }
};

const setLsVal = (key: string, value: string | number | boolean | null) => {
  if (value !== undefined && value !== null) {
    const str = JSON.stringify(value);

    localStorage.setItem(key, str);
  }
};

const useLocalStorage = (
  key: string,
  defaultValue: string | number | boolean | null = null
) => {
  const [value, setValue] = useState(getLsVal(key, defaultValue));

  useEffect(() => setLsVal(key, value), [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

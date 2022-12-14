// https://usehooks.com/useLocalStorage/
import { useState } from "react";

export function getStorageItem(key, initialValue) {
    if (typeof window === "undefined") {
        return initialValue;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    }
    catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
    }
}

export function setStorageItem(key, value) {
    try{
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }
    catch (error) {
        console.log(error);
    }
};

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
       return getStorageItem(key, initialValue);
    });
    const setValue = value => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setStorageItem(key, valueToStore);
    };
    return [storedValue, setValue];
}
import {useEffect, useState} from "react";

export function useLocalStorage(initialValue, localStorageKey) {
  const [data, setData] = useState(initialValue)

  useEffect(() => {
    localStorage.setItem(localStorageKey, data)
  }, [data])

  return [data, setData]
}
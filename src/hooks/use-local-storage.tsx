import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SEARCH_VALUE } from '../consts';

function useLocalStorage(): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(SEARCH_VALUE) ?? '';
  });

  useEffect(() => localStorage.setItem(SEARCH_VALUE, value), [value]);

  return [value, setValue];
}

export default useLocalStorage;

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SEARCH_VALUE } from '@/consts';

const useLocalStorage = (): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined')
      return window.localStorage.getItem(SEARCH_VALUE) ?? '';
    return '';
  });

  useEffect(() => {
    window.localStorage.setItem(SEARCH_VALUE, value);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;

import { SearchParam } from '@/types';

const assertString = (value: SearchParam): string => {
  if (typeof value === 'string') return value;
  return '';
};

export default assertString;

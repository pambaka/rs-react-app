import { SearchParam } from '@/types';
import assertString from './assert-string';

const getPath = (id: SearchParam) => {
  const charId = assertString(id);
  return charId ? `/details/${id}` : '';
};

export default getPath;

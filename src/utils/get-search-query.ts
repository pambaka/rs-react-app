import { SearchParam } from '@/types';
import assertString from './assert-string';

const getSearchQuery = (query: {
  search?: SearchParam;
  page?: SearchParam;
}) => {
  const paramsArr: string[] = [];

  const search = assertString(query.search);
  const page = assertString(query.page);

  if (search) paramsArr.push(`search=${search}`);
  paramsArr.push(`page=${page ? page : '1'}`);

  return `?${paramsArr.join('&')}`;
};

export default getSearchQuery;

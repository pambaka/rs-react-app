import isValidPageNumber from './is-valid-page-number';

const getValidPageNumber = (page: string | null) => {
  return isValidPageNumber(page) ? Number(page) : 1;
};

export default getValidPageNumber;

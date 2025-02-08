import isValidPageNumber from './is-valid-page-number';

function getValidPageNumber(page: string | null) {
  return isValidPageNumber(page) ? Number(page) : 1;
}

export default getValidPageNumber;

function isValidPageNumber(page: string | null) {
  const pageNumber = Number(page);

  if (pageNumber && pageNumber > 0 && pageNumber < 100) return true;

  return false;
}

export default isValidPageNumber;

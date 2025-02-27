import { PageAction } from '@/types';

const changeCurrentPageNumber = (
  currentNumber: number,
  action: PageAction
): number => {
  let newNumber = currentNumber;
  if (action === 'decrement' && currentNumber > 1)
    newNumber = currentNumber - 1;
  else if (action === 'increment') newNumber = currentNumber + 1;

  return newNumber;
};

export default changeCurrentPageNumber;

import { URL } from '../consts';

const getCharId = (url: string) => {
  return url.split(`${URL.people}/`)[1].replace('/', '');
};

export default getCharId;

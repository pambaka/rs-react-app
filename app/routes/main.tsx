import type { Route } from './+types/main';
import MainPage from '@/components/pages/main-page';
import getCharacters from '@/api/get-characters';
import { Outlet } from 'react-router';
import { Provider } from 'react-redux';
import store from '@/store/store';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const search = url.searchParams.get('search') ?? '';
  const page = url.searchParams.get('page') ?? '';

  const data = await getCharacters(search, page);

  return data;
};

export function meta() {
  return [
    { title: 'SW React app' },
    { name: 'description', content: 'StarWars React app' },
  ];
}

export default function Main({ loaderData }: Route.ComponentProps) {
  return (
    <Provider store={store}>
      <MainPage response={loaderData.response} message={loaderData.message} />
      <Outlet />
    </Provider>
  );
}

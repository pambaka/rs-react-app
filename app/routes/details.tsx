import type { Route } from './+types/details';
import Card from '@/components/card';
import getCharacter from '@/api/get-character';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const data = await getCharacter(params.charid);
  return data;
};

export function meta() {
  return [{ title: 'SW React app | Details' }];
}

export default function Details({ loaderData }: Route.ComponentProps) {
  return <Card char={loaderData.char} message={loaderData.message} />;
}

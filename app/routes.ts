import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/main.tsx', [
    route('details/:charid', 'routes/details.tsx'),
  ]),
  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;

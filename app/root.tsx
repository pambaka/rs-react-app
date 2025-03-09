import '@/styles/index.css';
import '@/styles/App.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import ThemeProvider from './providers/theme-provider';
import FallbackUi from './components/fallback-ui';
import Loader from './components/loader';
import LoaderProvider from './providers/loader-provider';
import { Suspense } from 'react';
import { NavigationEvents } from './navigation-events';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/sun.svg' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <div id="root">
            <div className="app">
              <LoaderProvider>
                {children}
                <Loader />
                <Suspense fallback={null}>
                  <NavigationEvents />
                </Suspense>
              </LoaderProvider>
            </div>
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <FallbackUi />;
}

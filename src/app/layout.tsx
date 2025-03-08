import '../styles/index.css';
import '../styles/App.css';
import StoreProvider from '@/providers/store-provider';
import ThemeProvider from '@/providers/theme-provider';
import LoaderProvider from '@/providers/loader-provider';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/navigation-events';
import Loader from '@/components/loader';

export const metadata = {
  title: 'SW React app',
  description: 'StarWars React app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="__next">
          <div className="app">
            <ThemeProvider>
              <LoaderProvider>
                <StoreProvider>
                  {children}
                  <Loader />
                </StoreProvider>
                <Suspense fallback={null}>
                  <NavigationEvents />
                </Suspense>
              </LoaderProvider>
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

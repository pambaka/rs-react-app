import '../styles/index.css';
import '../styles/App.css';
import StoreProvider from '@/providers/store-provider';
import ThemeProvider from '@/providers/theme-provider';

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
              <StoreProvider>{children}</StoreProvider>
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

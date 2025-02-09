import './App.css';
import { ReactNode } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/main-page/main-page';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';
import Card from './components/card/card';

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<FallbackUi />}>
              <MainPage />
              <Outlet />
            </ErrorBoundary>
          }
        >
          <Route path="details/:charId" element={<Card />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="message">Page is not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

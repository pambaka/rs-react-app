import './App.css';
import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/main-page/main-page';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<FallbackUi />}>
              <MainPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="*"
          element={<h1 className="message">Page is not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

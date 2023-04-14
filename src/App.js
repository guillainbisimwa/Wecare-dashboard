import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

export default function App() {
  return (
    <>
      <style>{`body { background-color: #f2f8ff; }`}</style>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

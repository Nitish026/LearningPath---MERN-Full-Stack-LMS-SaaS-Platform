import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appstore } from './app/store.js';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider';
import LoadingSpinner from './components/ui/loading-spinner';
import { useGetUserProfileQuery } from './features/api/authApi';

const Custom = ({ children }) => {
  const { isLoading } = useGetUserProfileQuery();

  if (isLoading) return <LoadingSpinner />;

  return children;
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appstore}>
      <ThemeProvider>
        <Custom>
          <App />
          <Toaster richColors position="top-right" />
        </Custom>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

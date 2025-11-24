import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import MirrorPage from './pages/MirrorPage';
import GymPage from './pages/GymPage';
import { Layout } from './components/Layout';

export type Page = 'home' | 'mirror' | 'gym';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  const navigate = (newPage: Page) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case 'mirror':
        return <MirrorPage />;
      case 'gym':
        return <GymPage />;
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

export default App;

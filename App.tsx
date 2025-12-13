
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import MirrorPage from './pages/MirrorPage';
import GymPage from './pages/GymPage';
import { CoursePage } from './pages/CoursePage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/Layout';

export type Page = 'home' | 'mirror' | 'gym' | 'course' | 'history' | 'settings';

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
      case 'course':
        return <CoursePage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
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

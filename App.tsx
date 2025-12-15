
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import MirrorPage from './pages/MirrorPage';
import GymPage from './pages/GymPage';
import { CoursePage } from './pages/CoursePage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/Layout';

export type Page = 'home' | 'mirror' | 'gym' | 'course' | 'history' | 'settings';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-red-500 p-8 flex flex-col items-center justify-center text-center font-sans">
          <div className="bg-red-950/30 border border-red-900/50 p-8 rounded-2xl max-w-2xl w-full backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-4 text-red-400">Application Error</h1>
            <p className="text-gray-400 mb-6">The application encountered a critical error and could not render.</p>
            <div className="bg-black/50 p-4 rounded-lg border border-red-900/30 text-left overflow-auto mb-8">
               <p className="font-mono text-sm text-red-300 break-all">
                {this.state.error?.message || "Unknown error occurred"}
               </p>
            </div>
            <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-900/20"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
        <Layout currentPage={page} onNavigate={navigate}>
            {renderPage()}
        </Layout>
    </ErrorBoundary>
  );
};

export default App;
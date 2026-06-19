import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SketchCanvas from './components/SketchCanvas';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Workspace from './components/Workspace';
import Projects from './components/Projects';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import AllProjectsPage from './components/AllProjectsPage';
import AllExperiencesPage from './components/AllExperiencesPage';
import AllCertificationsPage from './components/AllCertificationsPage';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import { PROJECTS } from './data/projects';
import LifeLately from './components/LifeLately';
import EventDetailPage from './components/EventDetailPage';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'all-projects', 'nagarsetu', 'janadesh'
  const [previousView, setPreviousView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      
      setCurrentView(prev => {
        if (prev === 'home' || prev === 'all-projects') {
          setPreviousView(prev);
        }
        if (hash === '#nagarsetu') return 'nagarsetu';
        if (hash === '#janadesh') return 'janadesh';
        if (hash === '#all-projects') return 'all-projects';
        if (hash === '#all-experiences') return 'all-experiences';
        if (hash === '#all-certifications') return 'all-certifications';
        if (hash.startsWith('#/life-lately/')) return 'life-lately-detail';
        return 'home';
      });
    };

    // Check hash on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const handleBack = () => {
    window.location.hash = previousView === 'all-projects' ? '#all-projects' : '';
  };

  const getSelectedProject = () => {
    return PROJECTS.find(p => p.id === currentView);
  };

  const getActiveEventId = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#/life-lately/')) {
      return hash.replace('#/life-lately/', '');
    }
    return '';
  };

  return (
    <div className="relative w-full min-h-screen text-sketchText select-none bg-white">

      {/* Loading Screen */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Performant Charcoal Cursor & Trail canvas */}
          <SketchCanvas />
          
          {/* Main View Router */}
          {currentView === 'home' ? (
            <main>
              <Hero />
              <Journey />
              <Projects />
              <Workspace />
              <Experience />
              <Achievements />
              <LifeLately />
              <Contact />
            </main>
          ) : currentView === 'all-projects' ? (
            <AllProjectsPage onBack={handleBackToHome} />
          ) : currentView === 'all-experiences' ? (
            <AllExperiencesPage onBack={handleBackToHome} />
          ) : currentView === 'all-certifications' ? (
            <AllCertificationsPage onBack={handleBackToHome} />
          ) : currentView === 'life-lately-detail' ? (
            <EventDetailPage eventId={getActiveEventId()} onBack={handleBackToHome} />
          ) : (
            <ProjectDetailsPage 
              project={getSelectedProject()} 
              onBack={handleBack} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

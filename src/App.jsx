import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroVideoScroll from './components/HeroVideoScroll';
import CollectionsCoverflow from './components/CollectionsCoverflow';
import HospitalityShowcase from './components/HospitalityShowcase';
import MasterResidenceShowcase from './components/MasterResidenceShowcase';
import MaterialPalette from './components/MaterialPalette';
import PortfolioGrid from './components/PortfolioGrid';
import ConsultationCTA from './components/ConsultationCTA';
import Footer from './components/Footer';
import StoryboardModal from './components/StoryboardModal';
import ProjectsModal from './components/ProjectsModal';
import ProjectsPage from './components/ProjectsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'projects'
  const [currentStage, setCurrentStage] = useState(null);
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState(null);

  // Sync state with URL hash for browser history & direct links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#projects' || hash === '#/projects') {
        setCurrentPage('projects');
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToProjects = (project = null) => {
    if (project) {
      setInspectedProject(project);
    }
    setCurrentPage('projects');
    window.location.hash = 'projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (anchor = '') => {
    setCurrentPage('home');
    if (anchor && anchor !== '#') {
      window.location.hash = anchor.replace('#', '');
      const el = document.getElementById(anchor.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProjectDossier = (project) => {
    setInspectedProject(project);
    setIsProjectsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0e10] text-[#f5f2eb] relative selection:bg-[#c5a880] selection:text-[#0c0e10]">
      {/* Floating Island Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigateToProjects={() => navigateToProjects()}
        onNavigateToHome={navigateToHome}
        onOpenStoryboard={() => setIsStoryboardOpen(true)}
        onOpenProjects={() => navigateToProjects()}
        currentStageIndex={currentStage?.id || 1}
      />

      {/* Dynamic View: Standalone Projects Page vs Atelier Home */}
      {currentPage === 'projects' ? (
        <ProjectsPage
          onBackToHome={() => navigateToHome()}
          onOpenProjectDossier={handleOpenProjectDossier}
          onOpenStoryboard={() => setIsStoryboardOpen(true)}
        />
      ) : (
        <main>
          {/* Section 1: Hero Video Scroll */}
          <HeroVideoScroll
            onStageChange={(stage) => setCurrentStage(stage)}
          />

          {/* Section 2: 3D Coverflow Collections Showcase */}
          <CollectionsCoverflow />

          {/* Section 3: Commercial Hospitality Portfolio (Home 3rd Section) */}
          <HospitalityShowcase 
            onSelectProject={handleOpenProjectDossier}
            onOpenAllProjects={() => navigateToProjects()}
          />

          {/* Flagship Master Residence Showcase (Replaced 1st image section with 2nd image) */}
          <MasterResidenceShowcase />

          {/* Materials Palette */}
          <MaterialPalette />

          {/* Selected Completed Residences */}
          <PortfolioGrid />

          {/* Private Consultation Booking */}
          <ConsultationCTA />
        </main>
      )}

      {/* Atelier Footer */}
      <Footer onOpenStoryboard={() => setIsStoryboardOpen(true)} />

      {/* Storyboard Specification Modal */}
      <StoryboardModal
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
      />

      {/* Commercial Hospitality Projects Dossier & Case Study Inspector */}
      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        initialProject={inspectedProject}
      />
    </div>
  );
}

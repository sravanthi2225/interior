import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Maximize2,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { HOSPITALITY_PROJECTS, HOSPITALITY_CREDENTIALS } from '../data/hospitalityProjects';

export default function ProjectsModal({ isOpen, onClose, initialProject = null }) {
  const [activeProject, setActiveProject] = useState(initialProject || HOSPITALITY_PROJECTS[0]);
  const [viewMode, setViewMode] = useState('dossier'); // 'dossier' | 'overview'

  // Update active project if initialProject changes when modal opens
  useEffect(() => {
    if (initialProject) {
      setActiveProject(initialProject);
    }
  }, [initialProject]);

  // Keyboard navigation: Escape to close, arrows to cycle
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIdx = HOSPITALITY_PROJECTS.findIndex(p => p.id === activeProject.id);
        const nextIdx = (currentIdx + 1) % HOSPITALITY_PROJECTS.length;
        setActiveProject(HOSPITALITY_PROJECTS[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const currentIdx = HOSPITALITY_PROJECTS.findIndex(p => p.id === activeProject.id);
        const prevIdx = (currentIdx - 1 + HOSPITALITY_PROJECTS.length) % HOSPITALITY_PROJECTS.length;
        setActiveProject(HOSPITALITY_PROJECTS[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeProject, onClose]);

  if (!isOpen) return null;

  const currentIdx = HOSPITALITY_PROJECTS.findIndex(p => p.id === activeProject.id);
  const isInProgress = activeProject.statusVariant === 'in-progress';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/94 backdrop-blur-2xl animate-in fade-in duration-300 select-none overflow-hidden"
      onClick={onClose}
    >
      {/* Outer Modal Container */}
      <div 
        className="relative w-full max-w-7xl h-[94vh] rounded-3xl overflow-hidden glass-panel border border-white/20 bg-[#0c0e10] flex flex-col shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Atelier Header Bar */}
        <div className="p-4 sm:p-6 px-6 sm:px-8 border-b border-white/10 flex items-center justify-between bg-[#121417]/90 backdrop-blur-md z-30 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] animate-pulse" />
            <div>
              <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#c5a880] uppercase">
                FRAME STONE · COMMERCIAL HOSPITALITY DOSSIER
              </div>
              <h2 className="font-editorial text-base sm:text-xl font-bold text-white tracking-wide">
                Project Archive ({currentIdx + 1} of {HOSPITALITY_PROJECTS.length})
              </h2>
            </div>
          </div>

          {/* View Toggles & Close Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode('dossier')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  viewMode === 'dossier' ? 'bg-[#c5a880] text-[#0c0e10] font-bold shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  viewMode === 'overview' ? 'bg-[#c5a880] text-[#0c0e10] font-bold shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                All Projects
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-[#c5a880] text-white hover:text-[#0c0e10] border border-white/20 hover:border-[#c5a880] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
              aria-label="Close Project Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: DEEP CASE STUDY DOSSIER (LONDON ATELIER STANDARD) */}
        {/* ======================================================== */}
        {viewMode === 'dossier' ? (
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left 4 Cols: Project Selector Sidebar (Desktop) */}
            <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0f1114] flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto flex-shrink-0 scrollbar-thin">
              <div className="p-4 sm:p-5 border-b border-white/10 hidden lg:block">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a880]">
                  Hospitality Works Catalogue
                </span>
              </div>

              {HOSPITALITY_PROJECTS.map((proj, pIdx) => {
                const isSelected = proj.id === activeProject.id;
                const pInProgress = proj.statusVariant === 'in-progress';

                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`p-3.5 sm:p-4 text-left transition-all duration-300 cursor-pointer border-b border-white/[0.05] flex items-center justify-between gap-3 flex-shrink-0 lg:flex-shrink min-w-[220px] lg:min-w-0 ${
                      isSelected
                        ? 'bg-[#c5a880]/15 border-l-4 border-l-[#c5a880]'
                        : 'hover:bg-white/[0.03] text-[#d8d2c4]/70 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-[#c5a880]">{proj.number}</span>
                        <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                          pInProgress ? 'bg-[#c5a880]/20 text-[#c5a880]' : 'bg-emerald-950/80 text-emerald-300'
                        }`}>
                          {proj.status}
                        </span>
                      </div>
                      <div className="font-editorial text-sm sm:text-base font-bold text-white truncate">
                        {proj.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#d8d2c4]/60 truncate">
                        {proj.location}
                      </div>
                    </div>

                    <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                      isSelected ? 'text-[#c5a880] translate-x-1' : 'opacity-0'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right 8 Cols: Detailed Case Study Stage */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 scrollbar-thin">
              <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
                
                {/* Hero Showcase Image */}
                <div className="relative aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                  <img
                    src={activeProject.heroImage}
                    alt={activeProject.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-black/20 to-transparent pointer-events-none" />

                  {/* Top Location / Status Pill */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#c5a880] uppercase">
                      {activeProject.number} · {activeProject.areaTag}
                    </span>

                    <span className={`px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-mono tracking-widest uppercase border ${
                      isInProgress
                        ? 'bg-[#c5a880]/20 text-[#c5a880] border-[#c5a880]/50'
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {activeProject.status}
                    </span>
                  </div>

                  {/* Bottom Title Bar inside Image */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <h1 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-xl">
                      {activeProject.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#c5a880] font-sans font-light tracking-wider mt-1 drop-shadow">
                      {activeProject.typology}
                    </p>
                  </div>
                </div>

                {/* Architectural Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl glass-panel border border-white/10 bg-[#121417]">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a880] block mb-1">Scale</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-white">{activeProject.scale}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a880] block mb-1">Timeline</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-white">{activeProject.completionYear}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a880] block mb-1">Location</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-white">{activeProject.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a880] block mb-1">Client Atelier</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-white">{activeProject.client}</span>
                  </div>
                </div>

                {/* The Architectural Narrative & Spatial Strategy */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880]">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>The Architectural Narrative</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                    {activeProject.leadQuote}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#d8d2c4]/80 font-sans font-light leading-relaxed">
                    {activeProject.narrative}
                  </p>
                </div>

                {/* Engineered Features Checklist */}
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880] block">
                    Engineered Hospitality Innovations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProject.features.map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-[#d8d2c4]/85 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Palette & Tactility Schedule */}
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880] block">
                    Bespoke Material & Finishes Schedule
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeProject.palette.map((mat, mIdx) => (
                      <div 
                        key={mIdx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: mat.hex }}
                          />
                          <span className="font-mono text-[10px] text-white/50">{mat.hex}</span>
                        </div>
                        <div className="text-xs font-medium text-white">{mat.name}</div>
                        <div className="text-[10px] font-mono text-[#c5a880] mt-0.5">{mat.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultation Inquiry Action Strip */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1b1c20] via-[#15171a] to-[#0c0e10] border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-editorial text-lg sm:text-xl font-bold text-white">
                      Planning a Commercial Hospitality Venue?
                    </h4>
                    <p className="text-xs text-[#d8d2c4]/70 mt-1">
                      Our commercial atelier manages concept, architectural layout, MEP integration, and turnkey joinery.
                    </p>
                  </div>

                  <a
                    href="#consultation"
                    onClick={onClose}
                    className="px-6 py-3 rounded-full bg-[#c5a880] hover:bg-[#d8c29d] text-[#0c0e10] font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl hover:scale-105 whitespace-nowrap"
                  >
                    Inquire Commercial Project
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: FULL ALL-PROJECTS GRID CATALOGUE                 */
          /* ======================================================== */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-thin">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c5a880]">Complete Hospitality Roster</span>
                <h3 className="font-editorial text-3xl font-bold text-white mt-1">All 8 Commercial Destinations</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {HOSPITALITY_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setActiveProject(proj);
                      setViewMode('dossier');
                    }}
                    className="group rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-[#c5a880] cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-[#141619] flex flex-col"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img 
                        src={proj.heroImage} 
                        alt={proj.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-mono uppercase tracking-wider text-[#c5a880]">
                        {proj.status}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#c5a880] mb-1">{proj.location}</div>
                        <h4 className="font-editorial text-base font-bold text-white group-hover:text-[#c5a880] transition-colors">{proj.name}</h4>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#d8d2c4]/60">
                        <span>{proj.scale.split('·')[0]}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar for Dossier Mode */}
        {viewMode === 'dossier' && (
          <div className="p-3 sm:p-4 px-6 sm:px-8 border-t border-white/10 bg-[#121417] flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => {
                const prevIdx = (currentIdx - 1 + HOSPITALITY_PROJECTS.length) % HOSPITALITY_PROJECTS.length;
                setActiveProject(HOSPITALITY_PROJECTS[prevIdx]);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#d8d2c4]/80 hover:text-white uppercase tracking-wider transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4 text-[#c5a880]" />
              <span className="hidden sm:inline">Previous:</span>
              <span className="text-[#c5a880]">{HOSPITALITY_PROJECTS[(currentIdx - 1 + HOSPITALITY_PROJECTS.length) % HOSPITALITY_PROJECTS.length].name}</span>
            </button>

            <button
              onClick={() => {
                const nextIdx = (currentIdx + 1) % HOSPITALITY_PROJECTS.length;
                setActiveProject(HOSPITALITY_PROJECTS[nextIdx]);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#d8d2c4]/80 hover:text-white uppercase tracking-wider transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/10"
            >
              <span className="hidden sm:inline">Next:</span>
              <span className="text-[#c5a880]">{HOSPITALITY_PROJECTS[(currentIdx + 1) % HOSPITALITY_PROJECTS.length].name}</span>
              <ChevronRight className="w-4 h-4 text-[#c5a880]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


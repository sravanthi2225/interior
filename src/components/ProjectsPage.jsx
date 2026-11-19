import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  MapPin, 
  Building2, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Maximize2, 
  TrendingUp, 
  PhoneCall, 
  Grid, 
  List
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { HOSPITALITY_PROJECTS, HOSPITALITY_CREDENTIALS } from '../data/hospitalityProjects';

export default function ProjectsPage({ onBackToHome, onOpenProjectDossier, onOpenStoryboard }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { label: 'All Works', count: HOSPITALITY_PROJECTS.length },
    { label: 'Fine Dining', count: HOSPITALITY_PROJECTS.filter(p => p.curationCategory === 'Fine Dining').length },
    { label: 'Cocktail Lounges & Bars', count: HOSPITALITY_PROJECTS.filter(p => p.curationCategory === 'Cocktail Lounges & Bars').length },
    { label: 'Cafes & Casual', count: HOSPITALITY_PROJECTS.filter(p => p.curationCategory === 'Cafes & Casual').length },
    { label: 'Banquets & Venues', count: HOSPITALITY_PROJECTS.filter(p => p.curationCategory === 'Banquets & Venues').length },
    { label: 'In Progress', count: HOSPITALITY_PROJECTS.filter(p => p.statusVariant === 'in-progress').length }
  ];

  const filteredProjects = HOSPITALITY_PROJECTS.filter(proj => {
    let matchesCategory = true;
    if (activeCategory === 'In Progress') {
      matchesCategory = proj.statusVariant === 'in-progress';
    } else if (activeCategory !== 'All') {
      matchesCategory = proj.curationCategory === activeCategory;
    }

    let matchesStatus = true;
    if (statusFilter === 'Completed') {
      matchesStatus = proj.statusVariant === 'completed';
    } else if (statusFilter === 'In Progress') {
      matchesStatus = proj.statusVariant === 'in-progress';
    }

    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0c0e10] text-[#f5f2eb] selection:bg-[#c5a880] selection:text-[#0c0e10] relative pb-20">
      {/* Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c5a880]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ======================================================== */}
      {/* 1. COMPACT EDITORIAL HERO (WITH BREATHING ROOM FOR NAVBAR) */}
      {/* ======================================================== */}
      <section className="relative z-10 pt-28 sm:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 md:px-10 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#c5a880]/30 text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a880] mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>08 Commissioned Spatial Monographs</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Hospitality Architecture Archive
            </h1>

            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[#d8d2c4]/75 font-sans font-light max-w-2xl leading-relaxed">
              Eight landmark dining, cocktail lounge, and banqueting environments crafted across Hyderabad’s premier design corridors.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 flex-shrink-0">
            <div>
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#c5a880]">08</div>
              <div className="text-[10px] font-mono text-[#d8d2c4]/60 uppercase tracking-wider">Venues</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-white">68K+</div>
              <div className="text-[10px] font-mono text-[#d8d2c4]/60 uppercase tracking-wider">Sq.Ft Scope</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-emerald-400">5 / 3</div>
              <div className="text-[10px] font-mono text-[#d8d2c4]/60 uppercase tracking-wider">Done · Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMPACT FILTER TOOLBAR                                */}
      {/* ======================================================== */}
      <section className="sticky top-18 sm:top-20 z-40 bg-[#0c0e10]/95 backdrop-blur-xl border-b border-white/[0.08] py-3 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === (cat.label === 'All Works' ? 'All' : cat.label);
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label === 'All Works' ? 'All' : cat.label)}
                  className={`px-3 py-1.5 rounded-full text-[10.5px] font-mono tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0c0e10] border-[#c5a880] shadow-[0_0_12px_rgba(197,168,128,0.3)] font-bold'
                      : 'bg-white/[0.03] text-[#d8d2c4]/70 border-white/[0.08] hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#0c0e10]/20 text-[#0c0e10]' : 'bg-white/10 text-[#d8d2c4]/60'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status & View Toggles */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 flex-shrink-0">
            <div className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono">
              <button
                onClick={() => setStatusFilter('All')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  statusFilter === 'All' ? 'bg-[#c5a880] text-[#0c0e10] font-bold' : 'text-[#d8d2c4]/70 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Completed')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  statusFilter === 'Completed' ? 'bg-[#c5a880] text-[#0c0e10] font-bold' : 'text-[#d8d2c4]/70 hover:text-white'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setStatusFilter('In Progress')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  statusFilter === 'In Progress' ? 'bg-[#c5a880] text-[#0c0e10] font-bold' : 'text-[#d8d2c4]/70 hover:text-white'
                }`}
              >
                In Progress
              </button>
            </div>

            <div className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#c5a880] text-[#0c0e10]' : 'text-white/60 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#c5a880] text-[#0c0e10]' : 'text-white/60 hover:text-white'
                }`}
                title="Ledger View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. COMPACT & ATTRACTIVE PROJECT SHOWCASE (NOT LENGTHY)   */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-10">
        
        {viewMode === 'grid' ? (
          /* 3-COLUMN ULTRA-ATTRACTIVE CARD GRID (~480px HEIGHT EACH) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj) => {
              const isInProgress = proj.statusVariant === 'in-progress';

              return (
                <article
                  key={proj.id}
                  onClick={() => onOpenProjectDossier(proj)}
                  className="group rounded-3xl overflow-hidden glass-panel border border-white/[0.09] hover:border-[#c5a880]/60 transition-all duration-500 hover:-translate-y-2 flex flex-col bg-[#131518] cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.65)]"
                >
                  {/* Image Container with Cinematic Zoom */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                    <img
                      src={proj.heroImage}
                      alt={proj.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                      loading="lazy"
                    />

                    {/* Gradient Masks */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-black/35 to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      <span className="font-mono text-xs tracking-[0.25em] text-[#c5a880] px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15">
                        #{proj.number}
                      </span>

                      <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[9px] font-mono tracking-widest uppercase border shadow-md ${
                        isInProgress
                          ? 'bg-[#c5a880]/20 text-[#c5a880] border-[#c5a880]/50'
                          : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isInProgress ? 'bg-[#c5a880] animate-pulse' : 'bg-emerald-400'}`} />
                        <span>{proj.status}</span>
                      </div>
                    </div>

                    {/* Bottom Title & Location Overlay */}
                    <div className="absolute bottom-4 inset-x-4 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 text-[10.5px] font-mono tracking-[0.18em] uppercase text-[#c5a880] mb-1 drop-shadow">
                        <MapPin className="w-3 h-3 text-[#c5a880]" />
                        <span>{proj.location}</span>
                      </div>

                      <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight drop-shadow-md group-hover:text-[#c5a880] transition-colors">
                        {proj.name}
                      </h2>
                    </div>

                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-xl border border-[#c5a880] text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#c5a880] flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c5a880]" />
                        <span>Examine Dossier</span>
                      </div>
                    </div>
                  </div>

                  {/* Sleek Body Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Typology and Scale Metadata Bar */}
                      <div className="flex items-center justify-between text-[11px] font-mono pb-2.5 border-b border-white/[0.08] mb-3">
                        <span className="text-[#c5a880] truncate mr-2 font-medium">{proj.typology}</span>
                        <span className="text-white/60 flex-shrink-0">{proj.scale}</span>
                      </div>

                      {/* Lead Architectural Quote - Clean & Compact */}
                      <p className="text-xs text-[#d8d2c4]/80 font-sans font-light leading-relaxed line-clamp-2 italic mb-4">
                        "{proj.leadQuote}"
                      </p>
                    </div>

                    {/* Bottom: Palette Swatches + Action Arrow */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      {/* Material Palette Swatches */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono tracking-widest text-[#d8d2c4]/50 uppercase">Palette:</span>
                        <div className="flex items-center -space-x-1">
                          {proj.palette.map((mat, mIdx) => (
                            <div
                              key={mIdx}
                              title={`${mat.name} (${mat.type})`}
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-125"
                              style={{ backgroundColor: mat.hex }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action Pill */}
                      <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#c5a880] group-hover:text-white transition-colors">
                        <span>Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* COMPACT ARCHITECTURAL LEDGER TABLE */
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 bg-[#121417]/90 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880]">
                    <th className="py-3 px-5">Code</th>
                    <th className="py-3 px-5">Venue & Typology</th>
                    <th className="py-3 px-5">Location</th>
                    <th className="py-3 px-5">Scale</th>
                    <th className="py-3 px-5">Materiality</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-xs font-mono">
                  {filteredProjects.map((proj) => (
                    <tr 
                      key={proj.id}
                      className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                      onClick={() => onOpenProjectDossier(proj)}
                    >
                      <td className="py-3 px-5 font-bold text-[#c5a880]">
                        #{proj.number}
                      </td>
                      <td className="py-3 px-5">
                        <div className="font-editorial text-sm font-bold text-white group-hover:text-[#c5a880] transition-colors">
                          {proj.name}
                        </div>
                        <div className="text-[10px] text-[#d8d2c4]/60 font-sans">
                          {proj.typology}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-[#d8d2c4]/80 text-[11px]">
                        {proj.location}
                      </td>
                      <td className="py-3 px-5 text-[#d8d2c4]/80 text-[11px]">
                        {proj.scale}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-1">
                          {proj.palette.map((p, pIdx) => (
                            <span 
                              key={pIdx}
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: p.hex }}
                              title={p.name}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                          proj.statusVariant === 'completed'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                            : 'bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/40'
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className="text-[#c5a880] group-hover:underline inline-flex items-center gap-0.5 text-[10.5px]">
                          Inspect <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* 5. SLEEK BOTTOM COMMISSIONING STRIP (COMPACT)            */}
      {/* ======================================================== */}
      <section id="commission-inquire" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-14 sm:mt-18">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#c5a880]/30 bg-gradient-to-r from-[#141619] via-[#101215] to-[#141619] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] mb-1">
              <Sparkles className="w-3 h-3 text-[#c5a880]" />
              <span>Commercial Commissioning Inquiries</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Commission Your Next Landmark Venue
            </h2>
            <p className="text-xs sm:text-sm text-[#d8d2c4]/70 font-sans font-light mt-1 max-w-xl">
              From concept zoning and acoustic modeling to bespoke fabrication and turn-key handover.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f5f2eb] hover:bg-[#c5a880] text-[#0c0e10] font-sans font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Schedule Consultation</span>
            </a>

            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 font-mono text-xs uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atelier Home</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

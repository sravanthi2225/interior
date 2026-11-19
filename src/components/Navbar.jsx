import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { Menu, X, ArrowUpRight, Building2 } from 'lucide-react';

export default function Navbar({ 
  onOpenStoryboard, 
  onOpenProjects, 
  onNavigateToProjects,
  onNavigateToHome,
  currentPage = 'home',
  currentStageIndex 
}) {
  const [isCapsule, setIsCapsule] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero-experience');

  useEffect(() => {
    const handleScroll = () => {
      // If on dedicated projects page, always keep the floating capsule
      if (currentPage === 'projects') {
        setIsCapsule(true);
        return;
      }

      // Check position of Section 2 (#collections)
      const collectionsEl = document.getElementById('collections');
      if (collectionsEl) {
        const rect = collectionsEl.getBoundingClientRect();
        // As soon as 2nd section approaches viewport top (within 120px) or is active
        setIsCapsule(rect.top <= 120);
      } else {
        setIsCapsule(window.scrollY > 450);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const isProjects = currentPage === 'projects';

  const navLinks = [
    { label: 'Transformation', href: '#hero-experience' },
    { label: 'Collections', href: '#collections' },
    { label: 'Projects', isProjectsPage: true },
    { label: 'Materials', href: '#materials' },
  ];

  const handleLinkClick = (link, e) => {
    e?.preventDefault();
    if (link.isProjectsPage) {
      if (isProjects) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onNavigateToProjects?.();
      }
    } else {
      if (isProjects) {
        onNavigateToHome?.(link.href);
      } else {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Navigation Header: Merged seamlessly in Hero; Morphs to floating capsule in Section 2 */}
      <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-700 ease-out ${
        isCapsule ? 'px-4 sm:px-6 md:px-10 pt-4 sm:pt-5' : 'px-4 sm:px-8 md:px-12 pt-5 sm:pt-7'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Navigation Bar (Seamless in Hero -> Floating Capsule in 2nd Section) */}
          <div
            className={`w-full pointer-events-auto h-[4.5rem] sm:h-[4.85rem] flex items-center justify-between transition-all duration-500 ease-out ${
              isCapsule
                ? 'px-6 sm:px-8 rounded-full bg-[#0c0e10]/95 backdrop-blur-3xl border border-white/[0.14] ring-1 ring-inset ring-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
                : 'px-2 sm:px-4 rounded-2xl bg-transparent border-transparent ring-0 shadow-none backdrop-blur-none'
            }`}
          >
            {/* Left: Brand Logo */}
            <button
              onClick={() => onNavigateToHome?.()}
              className={`flex items-center flex-shrink-0 group transition-transform duration-300 hover:scale-[1.02] py-1 cursor-pointer bg-transparent border-none text-left ${
                !isCapsule ? 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]' : ''
              }`}
              title="Return to Atelier Home"
            >
              <BrandLogo />
            </button>

            {/* Center: Desktop Navigation Links */}
            <nav className={`hidden xl:flex items-center gap-7 2xl:gap-8 text-[11px] 2xl:text-[11.5px] uppercase tracking-[0.22em] font-sans font-medium flex-shrink-0 transition-colors duration-500 ${
              isCapsule ? 'text-[#d8d2c4]/75' : 'text-[#f5f2eb]/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href || '#'}
                  onClick={(e) => handleLinkClick(link, e)}
                  className={`whitespace-nowrap transition-colors relative py-2 group cursor-pointer ${
                    (link.isProjectsPage && isProjects) ? 'text-[#c5a880]' : 'hover:text-white'
                  }`}
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    {link.label}
                  </span>
                  {/* Subtle hover champagne-gold indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#c5a880] transition-all duration-300 ease-out ${
                    link.isProjectsPage && isProjects ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
            </nav>

            {/* Right: Curated Action CTAs (Exact Same on All Pages) */}
            <div className="hidden xl:flex items-center gap-2.5 2xl:gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  if (isProjects) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    onNavigateToProjects?.();
                  }
                }}
                className={`h-10 px-4 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer group shadow-sm ${
                  isCapsule
                    ? 'bg-white/[0.04] hover:bg-[#c5a880]/15 border border-white/10 hover:border-[#c5a880]/50 text-[#d8d2c4] hover:text-[#c5a880]'
                    : 'bg-black/40 hover:bg-[#c5a880]/20 border border-white/20 text-[#f5f2eb] hover:text-[#c5a880] backdrop-blur-md'
                }`}
                title="Commercial Hospitality Projects (08 Works)"
              >
                <Building2 className="w-3.5 h-3.5 text-[#c5a880] group-hover:scale-110 transition-transform" />
                <span>Projects</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#c5a880]/20 text-[#c5a880] font-mono font-bold">08</span>
              </button>

              {/* Primary Inquire Studio CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  if (isProjects) {
                    e.preventDefault();
                    onNavigateToHome?.('#contact');
                  }
                }}
                className="h-10 px-5 sm:px-6 rounded-full bg-[#f5f2eb] hover:bg-[#c5a880] text-[#0c0e10] text-[11px] uppercase tracking-[0.18em] font-sans font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(197,168,128,0.45)] hover:scale-105 flex items-center gap-2 whitespace-nowrap cursor-pointer group"
              >
                <span className="whitespace-nowrap">Inquire Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="flex items-center gap-2 xl:hidden flex-shrink-0">
              <button
                onClick={onNavigateToProjects}
                className={`p-2.5 rounded-full border text-[#c5a880] hover:text-white transition-colors cursor-pointer ${
                  isCapsule ? 'glass-panel border-white/10' : 'bg-black/50 border-white/20 backdrop-blur-md'
                }`}
                title="Projects Page"
              >
                <Building2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-full border text-[#f5f2eb] hover:text-[#c5a880] transition-colors cursor-pointer ${
                  isCapsule ? 'glass-panel border-white/10' : 'bg-black/50 border-white/20 backdrop-blur-md'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Full-Screen Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto xl:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-[#0c0e10]/98 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880]">
                STUDIO NAVIGATION
              </span>
              <span className="text-[10px] font-mono text-white/40">
                FRAME STONE · LONDON · MILAN · NYC
              </span>
            </div>

            <nav className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em] font-medium text-[#d8d2c4]">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(link, e);
                  }}
                  className="py-2.5 border-b border-white/5 hover:text-[#c5a880] hover:pl-2 transition-all flex items-center justify-between text-left cursor-pointer w-full"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToProjects?.();
                }}
                className="w-full py-3.5 rounded-xl bg-white/[0.08] text-xs tracking-[0.16em] uppercase font-mono text-[#c5a880] flex items-center justify-center gap-2 cursor-pointer border border-[#c5a880]/50 shadow-md font-bold"
              >
                <Building2 className="w-4 h-4 text-[#c5a880]" />
                <span>Open Projects Page (08 Venues)</span>
              </button>
              
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#c5a880] text-[#0c0e10] text-center text-xs tracking-[0.2em] uppercase font-bold shadow-lg"
              >
                Inquire Studio
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

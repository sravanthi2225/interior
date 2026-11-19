import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  MapPin, 
  Building2, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { HOSPITALITY_PROJECTS, HOSPITALITY_CREDENTIALS } from '../data/hospitalityProjects';

function StatCounter({ targetValue, isVisible }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isVisible) return;

    let targetNum = 0;
    let suffix = '';
    let isDecimal = false;

    if (targetValue.includes('K+')) {
      targetNum = parseFloat(targetValue.replace('K+', ''));
      suffix = 'K+';
    } else if (targetValue.includes('+')) {
      targetNum = parseFloat(targetValue.replace('+', ''));
      suffix = '+';
    } else if (targetValue.includes('%')) {
      targetNum = parseFloat(targetValue.replace('%', ''));
      suffix = '%';
      if (targetValue.includes('.')) isDecimal = true;
    } else {
      targetNum = parseFloat(targetValue) || 0;
    }

    const duration = 2000;
    const startTime = performance.now();

    const updateFrame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Exponential ease out
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * targetNum;

      if (isDecimal) {
        setDisplay(current.toFixed(1) + suffix);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        setDisplay(targetValue);
      }
    };

    const animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, targetValue]);

  return <span>{display}</span>;
}

export default function HospitalityShowcase({ onSelectProject, onOpenAllProjects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const carouselRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
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
    if (activeCategory === 'All') return true;
    if (activeCategory === 'In Progress') return proj.statusVariant === 'in-progress';
    return proj.curationCategory === activeCategory;
  });

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
    setScrollProgress(progress);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [filteredProjects]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = 440;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="hospitality-projects" 
      className="py-18 sm:py-24 px-4 sm:px-6 md:px-10 bg-[#0c0e10] text-[#f5f2eb] relative overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-[#3d2b1f]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* ======================================================== */}
        {/* COMPACT ATELIER HEADER                                   */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#c5a880]/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#c5a880] uppercase mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>03 / COMMERCIAL ATELIER · HOSPITALITY WORKS</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.02em] text-white leading-tight drop-shadow-md">
              Selected Hospitality Works
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#d8d2c4]/75 font-sans font-light leading-relaxed">
              Bespoke dining sanctuaries, nocturnal cocktail lounges, and monumental banqueting architecture across Hyderabad’s premier design corridors.
            </p>
          </div>

          {/* Action Area: Filter Pills + Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
            {/* Direct Projects Page Button */}
            <button
              onClick={onOpenAllProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f2eb] hover:bg-[#c5a880] text-[#0c0e10] font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-all shadow-md hover:scale-105 cursor-pointer group"
              title="Open Standalone Projects Page"
            >
              <span>Explore All 08 Works</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft 
                    ? 'border-white/20 bg-white/[0.05] text-white hover:bg-[#c5a880] hover:text-[#0c0e10] hover:border-[#c5a880]' 
                    : 'border-white/5 bg-transparent text-white/20 cursor-not-allowed'
                }`}
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight 
                    ? 'border-white/20 bg-white/[0.05] text-white hover:bg-[#c5a880] hover:text-[#0c0e10] hover:border-[#c5a880]' 
                    : 'border-white/5 bg-transparent text-white/20 cursor-not-allowed'
                }`}
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPACT CATEGORY PILLS                                   */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === (cat.label === 'All Works' ? 'All' : cat.label);
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label === 'All Works' ? 'All' : cat.label)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#c5a880] text-[#0c0e10] border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.3)] font-bold'
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

        {/* ======================================================== */}
        {/* CINEMATIC HORIZONTAL SHOWCASE CAROUSEL (NOT LENGTHY)    */}
        {/* ======================================================== */}
        <div 
          ref={carouselRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((proj) => {
            const isInProgress = proj.statusVariant === 'in-progress';

            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 snap-start rounded-3xl overflow-hidden glass-panel border border-white/[0.09] hover:border-[#c5a880]/60 transition-all duration-500 hover:-translate-y-2 flex flex-col bg-[#141619] cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                  <img
                    src={proj.heroImage}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-black/35 to-black/20 pointer-events-none" />
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

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-4 inset-x-4 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 text-[10.5px] font-mono tracking-[0.18em] uppercase text-[#c5a880] mb-1 drop-shadow">
                      <MapPin className="w-3 h-3 text-[#c5a880]" />
                      <span>{proj.location}</span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                      {proj.name}
                    </h3>
                  </div>

                  {/* Hover Inspect Pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-xl border border-[#c5a880] text-[11px] font-mono uppercase tracking-[0.2em] text-[#c5a880] flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Examine Dossier</span>
                    </div>
                  </div>
                </div>

                {/* Card Specs Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Typology and Scale */}
                    <div className="flex items-center justify-between text-[11px] font-mono pb-3 border-b border-white/[0.08] mb-3">
                      <span className="text-[#c5a880] truncate mr-2">{proj.typology}</span>
                      <span className="text-white/60 flex-shrink-0">{proj.scale}</span>
                    </div>

                    {/* Lead Architectural Quote */}
                    <p className="text-xs text-[#d8d2c4]/75 font-sans font-light leading-relaxed line-clamp-2">
                      "{proj.leadQuote}"
                    </p>
                  </div>

                  {/* Bottom Swatches + Arrow */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-[#d8d2c4]/50 uppercase">Palette:</span>
                      <div className="flex items-center -space-x-1">
                        {proj.palette.slice(0, 4).map((mat, mIdx) => (
                          <div
                            key={mIdx}
                            title={`${mat.name} (${mat.type})`}
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: mat.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-[#c5a880] text-white group-hover:text-[#0c0e10] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final "Explore All Archive" Interactive Card */}
          <div 
            onClick={onOpenAllProjects}
            className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start rounded-3xl p-8 glass-panel border border-[#c5a880]/40 bg-gradient-to-br from-[#1c1d22] to-[#121417] hover:border-[#c5a880] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between cursor-pointer group shadow-2xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>

              <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a880] mb-2">
                COMPLETE ARCHIVE
              </div>

              <h3 className="font-editorial text-2xl font-bold text-white mb-3 group-hover:text-[#c5a880] transition-colors leading-snug">
                Explore All 08 Hospitality Projects
              </h3>

              <p className="text-xs text-[#d8d2c4]/70 font-sans leading-relaxed">
                Step into our dedicated projects page featuring full spatial dossiers, material schedules, and architectural specifications.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#c5a880]">
                Open Projects Page
              </span>
              <div className="w-9 h-9 rounded-full bg-[#c5a880] text-[#0c0e10] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="mt-4 max-w-xs mx-auto flex items-center gap-3">
          <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#c5a880]/60 to-[#c5a880] transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            SCROLL TO EXPLORE
          </span>
        </div>

        {/* ======================================================== */}
        {/* COMPACT SECTOR SCALE STRIP (WITH ANIMATED LOADING EFFECT) */}
        {/* ======================================================== */}
        <div 
          ref={statsRef}
          className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-[#c5a880]/25 bg-gradient-to-r from-[#141619] via-[#101215] to-[#141619] relative overflow-hidden shadow-2xl"
        >
          {/* Animated Gold Loading Shimmer Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-[#c5a880]/30 via-[#c5a880] to-[#f5f2eb] transition-all duration-[2000ms] ease-out ${
                statsVisible ? 'w-full' : 'w-0'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {HOSPITALITY_CREDENTIALS.stats.map((stat, sIdx) => (
              <div key={sIdx} className={`${sIdx > 1 ? 'pt-4 md:pt-0' : ''} group`}>
                <div className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#c5a880] tracking-tight">
                  <StatCounter targetValue={stat.value} isVisible={statsVisible} />
                </div>
                <div className="text-xs font-sans text-white/90 mt-1.5 font-medium tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-[#d8d2c4]/50 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowLeftRight, 
  X, 
  CheckCircle2,
  MoveHorizontal,
  Compass,
  Layers
} from 'lucide-react';

const COLLECTIONS = [
  {
    id: 1,
    title: 'The Master Living Suite',
    subtitle: 'Warm Travertine · Herringbone Oak · Cove Illumination',
    category: 'Full Residence Transformation',
    beforeImage: '/collections/collection_1_before.jpg',
    afterImage: '/collections/collection_1.jpg',
    specCode: '01-LR // LIVING SALON SUBSTRATE',
    beforeBadge: 'BEFORE: RAW ARCHITECTURAL SHELL',
    afterBadge: 'AFTER: CURATED LIVING SUITE',
    description: 'Bespoke architectural metamorphosis: from raw structural substrate and unrefined volume into an expansive master living sanctuary with low bouclé seating, French oak parquet, and flush cove illumination.'
  },
  {
    id: 2,
    title: 'Tactile Salon & Lounge',
    subtitle: 'Fluted White Oak · Curated Ceramics',
    category: 'Intimate Lounge & Library',
    beforeImage: '/collections/collection_2_before.jpg',
    afterImage: '/collections/collection_2.jpg',
    specCode: '02-LN // LOUNGE ENVELOPE',
    beforeBadge: 'BEFORE: UNSTAGED VOLUME',
    afterBadge: 'AFTER: FLUTED OAK SALON',
    description: 'Floor-to-ceiling fluted oak wall paneling with integrated warm 2700K cove perimeter wash, sculptural bouclé armchairs, and monolithic travertine plinths.'
  },
  {
    id: 3,
    title: 'Monolithic Haven',
    subtitle: 'Honed Travertine · Raw Belgian Linen',
    category: 'Master Bedroom Sanctuary',
    beforeImage: '/collections/collection_3_before.jpg',
    afterImage: '/collections/collection_3.jpg',
    specCode: '03-MB // BEDROOM CORE',
    beforeBadge: 'BEFORE: MONOLITHIC CORE',
    afterBadge: 'AFTER: RESTORATIVE HAVEN',
    description: 'Monolithic travertine headboard feature wall with concealed perimeter cove glow, low platform bed in washed Belgian linen, and fluted oak nightstands.'
  },
  {
    id: 4,
    title: 'Architectural Dining',
    subtitle: 'Pill-Shaped Travertine · Earthenware',
    category: 'Dining & Gallery Space',
    beforeImage: '/collections/collection_4_before.jpg',
    afterImage: '/collections/collection_4.jpg',
    specCode: '04-DN // DINING VOLUME',
    beforeBadge: 'BEFORE: ROUGH-IN MEP SPEC',
    afterBadge: 'AFTER: SCULPTURAL DINING',
    description: 'Bespoke pill-shaped travertine dining table on fluted cylindrical stone plinths, flanked by curved minimalist oak and bouclé chairs.'
  },
  {
    id: 5,
    title: 'The Flagship Penthouse Suite',
    subtitle: 'Linear Track Optics · French Oak Parquet',
    category: 'Full Master Penthouse',
    beforeImage: '/collections/collection_5_before.jpg',
    afterImage: '/collections/collection_5.jpg',
    specCode: '05-PH // PENTHOUSE SHELL',
    beforeBadge: 'BEFORE: 01 / ARCHITECTURE',
    afterBadge: 'AFTER: 04 / EXPERIENCE',
    description: 'Complete bespoke spatial metamorphosis featuring continuous French oak parquet, backlit floating joinery, and acoustic drapery.'
  }
];

export default function CollectionsCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Drag & cursor side scroll state
  const isDraggingDeckRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const deckContainerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const lastWheelTimeRef = useRef(0);

  // Sync slider container width accurately across all devices and window resizes
  useEffect(() => {
    if (!activeBeforeAfter) return;
    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setSliderWidth(sliderContainerRef.current.offsetWidth);
      }
    };
    updateWidth();
    // Allow animation frame settle
    const raf = requestAnimationFrame(updateWidth);
    window.addEventListener('resize', updateWidth);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateWidth);
    };
  }, [activeBeforeAfter]);

  const total = COLLECTIONS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeBeforeAfter) {
        if (e.key === 'Escape') setActiveBeforeAfter(null);
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, activeBeforeAfter]);

  // Cursor side scroll handlers (Mouse Drag on deck)
  const handleDeckMouseDown = (e) => {
    isDraggingDeckRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handleDeckMouseMove = (e) => {
    if (!isDraggingDeckRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = diff;

    if (Math.abs(diff) > 70) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      dragStartXRef.current = e.clientX;
      dragDistanceRef.current = 0;
    }
  };

  const handleDeckMouseUp = () => {
    isDraggingDeckRef.current = false;
  };

  // Wheel horizontal scroll
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 260) return;

    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 35) {
      if (e.deltaX > 25 || e.deltaY > 35) {
        nextSlide();
        lastWheelTimeRef.current = now;
      } else if (e.deltaX < -25 || e.deltaY < -35) {
        prevSlide();
        lastWheelTimeRef.current = now;
      }
    }
  };

  // Click card
  const handleCardClick = (idx) => {
    if (Math.abs(dragDistanceRef.current) > 10) return;

    if (idx === activeIndex) {
      setActiveBeforeAfter(COLLECTIONS[idx]);
      setSliderPos(50);
    } else {
      setActiveIndex(idx);
    }
  };

  // Slider drag
  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  // 3D Coverflow positioning
  const getSlideStyle = (index) => {
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    if (diff === 0) {
      return {
        transform: 'translateX(0%) scale(1) translateZ(0px)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto',
      };
    } else if (diff === 1) {
      return {
        transform: 'translateX(58%) scale(0.85) translateZ(-80px) rotateY(-8deg)',
        zIndex: 20,
        opacity: 0.72,
        filter: 'brightness(0.75)',
        pointerEvents: 'auto',
      };
    } else if (diff === -1) {
      return {
        transform: 'translateX(-58%) scale(0.85) translateZ(-80px) rotateY(8deg)',
        zIndex: 20,
        opacity: 0.72,
        filter: 'brightness(0.75)',
        pointerEvents: 'auto',
      };
    } else if (diff === 2 || diff === -3) {
      return {
        transform: 'translateX(95%) scale(0.7) translateZ(-160px) rotateY(-14deg)',
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(0.5)',
        pointerEvents: 'none',
      };
    } else {
      return {
        transform: 'translateX(-95%) scale(0.7) translateZ(-160px) rotateY(14deg)',
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(0.5)',
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section
      id="collections"
      className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 bg-[#15171a] text-[#f5f2eb] relative overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient Lighting & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header (Matching Image 2: "Collections") */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#c5a880]/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#c5a880] uppercase mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Curated Living Spaces</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.06em] text-white drop-shadow-2xl">
            Collections
          </h2>
          
          <p className="mt-1.5 text-xs sm:text-sm md:text-base text-[#d8d2c4]/70 max-w-xl mx-auto font-sans leading-relaxed">
            Drag or swipe horizontally across the deck. Click any collection card to inspect the interactive Before & After transformation.
          </p>
        </div>

        {/* 3D Coverflow Container with Cursor Side Scroll */}
        <div 
          ref={deckContainerRef}
          onMouseDown={handleDeckMouseDown}
          onMouseMove={handleDeckMouseMove}
          onMouseUp={handleDeckMouseUp}
          onMouseLeave={handleDeckMouseUp}
          onWheel={handleWheel}
          className="relative w-full max-w-5xl h-[320px] sm:h-[390px] md:h-[440px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
        >
          {/* Navigation Button: Left (<) */}
          <button
            onClick={prevSlide}
            aria-label="Previous Collection"
            className="absolute left-2 sm:left-4 md:-left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-[#c5a880] text-white hover:text-[#0c0e10] border border-white/20 hover:border-[#c5a880] backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Navigation Button: Right (>) */}
          <button
            onClick={nextSlide}
            aria-label="Next Collection"
            className="absolute right-2 sm:right-4 md:-right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-[#c5a880] text-white hover:text-[#0c0e10] border border-white/20 hover:border-[#c5a880] backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Coverflow Cards Deck */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {COLLECTIONS.map((item, idx) => {
              const slideStyle = getSlideStyle(idx);
              const isCenter = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(idx)}
                  style={slideStyle}
                  className="absolute w-[82%] sm:w-[68%] md:w-[60%] aspect-[16/11] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 transition-all duration-600 ease-out origin-center bg-[#15171a] group"
                >
                  {/* Card Interior Image */}
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full glass-panel border border-white/15 text-[9.5px] sm:text-[11px] font-mono tracking-widest uppercase text-[#c5a880]">
                      {item.category}
                    </span>
                  </div>

                  {/* Top Right Click Cue for Center Card */}
                  {isCenter && (
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                      <div className="px-3 py-1.5 rounded-full bg-black/75 border border-[#c5a880]/60 text-[10px] font-mono uppercase tracking-widest text-[#c5a880] flex items-center gap-1.5 shadow-xl group-hover:scale-105 transition-transform">
                        <ArrowLeftRight className="w-3.5 h-3.5 text-[#c5a880]" />
                        <span>Interactive Before / After</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 md:p-8 flex flex-col justify-end pointer-events-none">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#c5a880] font-sans font-light tracking-wider mt-1 drop-shadow">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Explore Button */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 group-hover:bg-[#c5a880] text-white group-hover:text-[#0c0e10] border border-white/20 flex items-center justify-center transition-all flex-shrink-0 group-hover:scale-110 shadow-lg">
                        <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dashes */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-2.5">
          {COLLECTIONS.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 sm:w-10 bg-[#c5a880] shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                    : 'w-2.5 sm:w-3 bg-white/25 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>

      </div>

      {/* ======================================================== */}
      {/* SEAMLESS CINEMA-GRADE BEFORE / AFTER TRANSFORMATION VIEW */}
      {/* (100% Matching Spatial Geometry · Borderless Luxury UI)  */}
      {/* ======================================================== */}
      {activeBeforeAfter && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-300 select-none"
          onClick={() => setActiveBeforeAfter(null)}
        >
          {/* Outer Card with Refined Floating Glass Treatment */}
          <div
            className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/20 flex flex-col bg-[#0c0e10]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Seamless Top Floating Bar (No bulky black bar, pure floating elegance) */}
            <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 px-6 sm:px-8 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none">
              <div className="pointer-events-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a880]/30 text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#c5a880] mb-1.5 shadow-lg">
                  <Compass className="w-3 h-3 text-[#c5a880]" />
                  <span>SPATIAL METAMORPHOSIS COMPARISON</span>
                </div>
                <h3 className="font-editorial text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                  {activeBeforeAfter.title}
                </h3>
              </div>

              {/* Floating Minimal Close Button */}
              <button
                onClick={() => setActiveBeforeAfter(null)}
                className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-[#0c0e10] border border-white/20 hover:border-[#c5a880] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-xl"
                aria-label="Close Comparison"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Before / After Split Slider Container (100% Geometrical Match) */}
            <div
              ref={sliderContainerRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] overflow-hidden select-none cursor-ew-resize group bg-[#0c0e10]"
              onMouseDown={() => setIsSliderDragging(true)}
              onMouseUp={() => setIsSliderDragging(false)}
              onMouseLeave={() => setIsSliderDragging(false)}
              onMouseMove={(e) => {
                if (isSliderDragging) handleSliderMove(e.clientX);
              }}
              onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
            >
              {/* AFTER LAYER: Fully Completed Luxury Space */}
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                  src={activeBeforeAfter.afterImage}
                  alt={`${activeBeforeAfter.title} After`}
                  className="w-full h-full object-cover scale-[1.08] origin-center filter brightness-[0.99] contrast-[1.02]"
                />

                {/* Watermark-Eliminating Dark Corner Shield */}
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#0c0e10] via-[#0c0e10]/85 to-transparent pointer-events-none z-20" />

                {/* AFTER BADGE (Floating Top Right Glass Pill) */}
                <div className="absolute top-20 sm:top-24 right-5 sm:right-8 z-20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-xl border border-[#c5a880]/50 text-[10.5px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880] flex items-center gap-2 shadow-2xl">
                  <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
                  <span>{activeBeforeAfter.afterBadge || 'AFTER: 04 / EXPERIENCE'}</span>
                </div>
              </div>

              {/* BEFORE LAYER: 100% Geometrically & Spatially Matched Raw Construction Substrate (Clipped via clip-path) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={activeBeforeAfter.beforeImage}
                  alt={`${activeBeforeAfter.title} Before`}
                  className="w-full h-full object-cover scale-[1.08] origin-center filter brightness-95 contrast-[1.04]"
                />

                {/* Watermark-Eliminating Dark Corner Shield */}
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#0c0e10] via-[#0c0e10]/85 to-transparent pointer-events-none z-20" />

                {/* BEFORE BADGE (Floating Top Left Glass Pill) */}
                <div className="absolute top-20 sm:top-24 left-5 sm:left-8 z-20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-[10.5px] sm:text-xs font-mono tracking-[0.2em] uppercase text-white/90 shadow-2xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#475440]" />
                  <span>{activeBeforeAfter.beforeBadge || 'BEFORE: 01 / ARCHITECTURE'}</span>
                </div>
              </div>

              {/* VERTICAL DIVIDER & CENTRAL GLOWING DRAG HANDLE */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f5f2eb] text-[#0c0e10] shadow-[0_0_35px_rgba(197,168,128,0.55)] flex items-center justify-center border-2 border-[#c5a880] group-hover:scale-110 active:scale-95 transition-transform">
                  <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0c0e10]" />
                </div>
              </div>

              {/* Floating Bottom Drag Helper Cue */}
              <div className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2 text-[10.5px] sm:text-xs font-mono text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-md py-2 px-5 max-w-sm sm:max-w-md mx-auto rounded-full border border-white/15 pointer-events-none shadow-xl">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>DRAG DIVIDER TO REVEAL TRANSFORMATION</span>
              </div>
            </div>

            {/* Seamless Bottom Description Strip */}
            <div className="p-4 sm:p-5 px-6 sm:px-8 border-t border-white/10 bg-[#0c0e10] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#d8d2c4]/75">
              <p className="max-w-2xl text-center sm:text-left leading-relaxed">
                {activeBeforeAfter.description}
              </p>
              <button
                onClick={() => setActiveBeforeAfter(null)}
                className="px-6 py-2.5 rounded-full bg-[#f5f2eb] hover:bg-[#c5a880] text-[#0c0e10] font-mono text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-lg cursor-pointer whitespace-nowrap"
              >
                Back To Collections
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

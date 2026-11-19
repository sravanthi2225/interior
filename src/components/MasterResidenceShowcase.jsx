import React, { useState } from 'react';
import { Maximize2, Compass, Layers, CheckCircle2, ArrowUpRight, X } from 'lucide-react';

export default function MasterResidenceShowcase() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hotspots = [
    {
      id: 'marble',
      top: '32%',
      left: '52%',
      label: 'Bookmatched Calacatta Marble',
      detail: 'Precision-aligned Italian Calacatta Borghini slab with concealed perimeter warm cove luminescence.'
    },
    {
      id: 'staircase',
      top: '42%',
      left: '84%',
      label: 'Cantilevered Architectural Staircase',
      detail: 'Floating monolithic stone treads with flush recessed linear LED illumination and seamless structural glass balustrade.'
    },
    {
      id: 'joinery',
      top: '38%',
      left: '31%',
      label: 'Fluted White Oak Joinery',
      detail: 'Floor-to-ceiling architectural millwork housing illuminated curio niches, acoustic timber fins, and concealed MEP.'
    },
    {
      id: 'salon',
      top: '72%',
      left: '48%',
      label: 'Curated Low-Slung Bouclé Salon',
      detail: 'Custom circular marble plinth coffee table paired with deep modular Italian bouclé sectional seating.'
    }
  ];

  return (
    <section
      id="flagship-residence"
      className="w-full bg-[#0c0e10] text-[#f5f2eb] relative overflow-hidden py-0 border-t border-white/[0.08]"
    >
      {/* Ambient Lighting & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#c5a880]/10 rounded-full blur-[170px] pointer-events-none z-0" />

      {/* ======================================================== */}
      {/* FULL HORIZONTAL SCREEN FILL VISUAL CANVAS (EDGE-TO-EDGE) */}
      {/* ======================================================== */}
      <div className="w-full relative h-[65vh] sm:h-[78vh] md:h-[88vh] min-h-[520px] overflow-hidden group shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 border-y border-white/[0.10]">

        {/* Full Bleed Image */}
        <img
          src="/master_residence_hero.jpg"
          alt="The Sculpted Master Residence - Full Screen"
          className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Cinematic Edge Dissolve Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-transparent to-[#0c0e10]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

        {/* Interactive Architectural Hotspot Pins Across Full Screen */}
        {hotspots.map((spot) => {
          const isActive = activeHotspot === spot.id;
          return (
            <div
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <button
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                className="relative group/pin p-2.5 cursor-pointer focus:outline-none"
                aria-label={spot.label}
              >
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-full bg-[#c5a880]/40 animate-ping opacity-75" />
                {/* Center dot */}
                <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0c0e10]/90 border border-[#c5a880] text-[#c5a880] group-hover/pin:bg-[#c5a880] group-hover/pin:text-[#0c0e10] transition-colors shadow-2xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                </span>
              </button>

              {/* Popover Card */}
              {isActive && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 sm:w-76 p-4 sm:p-5 rounded-2xl bg-[#0c0e10]/95 backdrop-blur-2xl border border-[#c5a880]/50 shadow-2xl text-left z-40 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] mb-1">
                    Architectural Specification
                  </div>
                  <div className="font-editorial text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                    {spot.label}
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#d8d2c4]/80 font-sans leading-relaxed">
                    {spot.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Bottom Metadata Bar */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 pointer-events-none z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">

            <div className="max-w-xl">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#c5a880] block mb-1 drop-shadow-md">
                MONUMENTAL LIVING SALON & GALLERY · THE MASTER RESIDENCE
              </span>
              <h3 className="font-editorial text-xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg leading-tight">
                Seamless Material Continuity & Light Architecture
              </h3>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="px-5 py-2.5 rounded-full bg-black/80 hover:bg-[#c5a880] text-white hover:text-[#0c0e10] border border-white/20 hover:border-[#c5a880] backdrop-blur-xl text-xs font-mono uppercase tracking-[0.16em] flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-105"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen View</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. FOUR SPECIFICATION TILES (MAX-W-7XL)                  */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-8 sm:mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] bg-[#121417]/80">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] block mb-1">
              01 / Core Stone
            </span>
            <div className="font-editorial text-base font-bold text-white">Calacatta Borghini</div>
            <p className="text-xs text-[#d8d2c4]/65 font-sans mt-1">
              Bookmatched slabs with micro-vein waterjet alignment.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] bg-[#121417]/80">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] block mb-1">
              02 / Joinery
            </span>
            <div className="font-editorial text-base font-bold text-white">Fluted White Oak</div>
            <p className="text-xs text-[#d8d2c4]/65 font-sans mt-1">
              Bespoke vertical slat detailing with warm cove reveals.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] bg-[#121417]/80">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] block mb-1">
              03 / Structure
            </span>
            <div className="font-editorial text-base font-bold text-white">Floating Staircase</div>
            <p className="text-xs text-[#d8d2c4]/65 font-sans mt-1">
              Cantilevered treads with integrated linear optics.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] bg-[#121417]/80">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a880] block mb-1">
              04 / Illumination
            </span>
            <div className="font-editorial text-base font-bold text-white">Linear Track Optics</div>
            <p className="text-xs text-[#d8d2c4]/65 font-sans mt-1">
              Museum-grade 2700K recessed wash for acoustic calm.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/96 backdrop-blur-2xl animate-in fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-black/75 border border-white/20 text-white hover:text-[#c5a880] transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-7xl w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <img
              src="/master_residence_hero.jpg"
              alt="The Sculpted Master Residence - Full Resolution"
              className="w-full h-auto object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}

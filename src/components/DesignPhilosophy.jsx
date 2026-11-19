import React from 'react';
import { Compass, Lightbulb, Armchair, Heart, ArrowUpRight } from 'lucide-react';

const PILLARS = [
  {
    num: '01',
    label: 'ARCHITECTURE',
    headline: 'Luxury Begins Here',
    desc: 'Before ornamentation exists pure proportion. We examine the skeletal concrete shell, structural volume, solar axis, and ceiling thresholds to uncover the innate poetry of the raw space.',
    icon: Compass,
    accent: '#475440',
    detail: 'Spatial orientation · Structural concrete · Volumetric planning'
  },
  {
    num: '02',
    label: 'STRUCTURE',
    headline: 'Precision Meets Design',
    desc: 'Surfaces smooth into monolithic planes. Architectural lighting is recessed into linear micro-tracks; French herringbone oak settles beneath foot, and cove reveals gently wash walls with 2700K warmth.',
    icon: Lightbulb,
    accent: '#c5a880',
    detail: 'Recessed LED channels · French oak herringbone · Concealed cove lighting'
  },
  {
    num: '03',
    label: 'FURNISHINGS',
    headline: 'Modern Living',
    desc: 'Tactile monoliths take form. Travertine coffee tables anchor the seating zone, while bespoke low-slung bouclé sectionals and sculptural terracotta chairs introduce sculptural ergonomics.',
    icon: Armchair,
    accent: '#8d7a62',
    detail: 'Veined Roman travertine · Low-profile modular upholstery · Art curation'
  },
  {
    num: '04',
    label: 'EXPERIENCE',
    headline: 'Welcome Home',
    desc: 'The room breathes. Architectural shelves illuminate bespoke curiosities; live greenery filters daylight, and textural cashmere drapes soften acoustics into an immersive private sanctuary.',
    icon: Heart,
    accent: '#586553',
    detail: 'Botanical styling · Acoustic dampening · Twilight ambient calibration'
  }
];

export default function DesignPhilosophy() {
  return (
    <section id="philosophy" className="py-28 px-6 md:px-12 bg-[#0c0e10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase mb-4">
              <span>The Frame Stone Method</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight">
              Four Pillars of Haute Spatial Craft
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#d8d2c4]/70 max-w-md font-sans">
            Every Frame Stone transformation follows our rigorous four-phase protocol, elevating raw structural voids into timeless architectural expressions.
          </p>
        </div>

        {/* Four Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative p-8 rounded-3xl glass-panel border border-white/[0.08] hover:border-[#c5a880]/50 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-[#c5a880]/80">
                      {pillar.num}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/[0.04] text-white/80 group-hover:text-[#c5a880] group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#c5a880] mb-2 font-semibold">
                    {pillar.label}
                  </div>

                  {/* Headline */}
                  <h3 className="font-editorial text-xl font-bold text-white mb-4 group-hover:text-[#f5f2eb] transition-colors">
                    {pillar.headline}
                  </h3>

                  {/* Body */}
                  <p className="text-xs md:text-sm text-[#d8d2c4]/75 font-sans leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                {/* Footer spec tag */}
                <div className="pt-4 border-t border-white/[0.07] text-[10.5px] font-mono text-white/40 tracking-wider">
                  {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


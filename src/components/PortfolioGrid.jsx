import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'The Kensington Quadrangle',
    location: 'London, UK',
    category: 'Full Residence Metamorphosis',
    area: '480 m²',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Travertine Slabs', 'Cove Illumination', 'Oak Parquet']
  },
  {
    id: 2,
    title: 'Via Montenapoleone Penthouse',
    location: 'Milan, Italy',
    category: 'Historic Palazzo Conversion',
    area: '340 m²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Custom Joinery', 'Ceiling Beams', 'Sculptural Lighting']
  },
  {
    id: 3,
    title: 'Tribeca Cast-Iron Loft',
    location: 'New York, USA',
    category: 'Industrial Void to Sanctuary',
    area: '520 m²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Raw Concrete', 'Olive Steel', 'Terracotta Accents']
  }
];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section id="portfolio" className="py-28 px-6 md:px-12 bg-[#0c0e10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase mb-4">
              <span>Selected Works</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight">
              Curated Architectural Transformations
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#d8d2c4]/70 max-w-md font-sans">
            A portfolio of private residences across Europe and North America where structural discipline harmonizes with haute interior styling.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/[0.08] hover:border-[#c5a880]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image with zoom */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-transparent to-black/20" />
                
                {/* Year tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-panel text-[10px] font-mono tracking-widest text-[#c5a880] border border-white/10">
                  {proj.year}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#c5a880] mb-2">
                    {proj.location} · {proj.area}
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-2 group-hover:text-[#c5a880] transition-colors flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#c5a880]" />
                  </h3>
                  <p className="text-xs text-[#d8d2c4]/70 font-sans mb-4">
                    {proj.category}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-1.5">
                  {proj.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[9.5px] font-mono text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


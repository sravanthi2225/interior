import React from 'react';
import { Layers, Sparkles, Check } from 'lucide-react';

const MATERIALS = [
  {
    name: 'Navona Travertine Stone',
    category: 'Mineral Monolith',
    origin: 'Tivoli, Italy',
    texture: 'Honed cross-cut with natural open pores',
    colorHex: '#C9BA9B',
    usage: 'Signature Portal Jamb, Monolithic Coffee Table, Plinths'
  },
  {
    name: 'French White Oak',
    category: 'Hardwood Timber',
    origin: 'Burgundy, France',
    texture: 'Wire-brushed 45° herringbone with matte bio-oil',
    colorHex: '#8D7A62',
    usage: 'Continuous Parquet Flooring & TV Reveal Joinery'
  },
  {
    name: 'Architectural Olive Bronze',
    category: 'Anodized Alloy',
    origin: 'Solingen, Germany',
    texture: 'Matte satin powder-coat with patinated edge',
    colorHex: '#475440',
    usage: 'Portal Arch, Linear Track Housings, Bookcase Trims'
  },
  {
    name: 'Linear Micro-Optic Cove (2700K)',
    category: 'Architectural Luminaire',
    origin: 'Zurich, Switzerland',
    texture: 'High-CRI 98+ diffuse warmth with zero glare',
    colorHex: '#E0C08D',
    usage: 'Ceiling Perimeters, Floating Joinery Undercabinet Glow'
  },
  {
    name: 'Alpine Bouclé & Heavy Linen',
    category: 'Tactile Textiles',
    origin: 'Flanders, Belgium',
    texture: 'Un-dyed virgin wool loop with washed linen weave',
    colorHex: '#DFCCA8',
    usage: 'Curvilinear Modular Lounge & Acoustic Drapery'
  }
];

export default function MaterialPalette() {
  return (
    <section id="materials" className="py-28 px-6 md:px-12 bg-[#090b0c] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Honest Materiality</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight">
            The Noble Material Archive
          </h2>
          <p className="mt-4 text-[#d8d2c4]/70 text-sm md:text-base leading-relaxed">
            Every surface captured in our transformation sequences is curated for tactile authenticity, acoustic warmth, and graceful aging under natural daylight.
          </p>
        </div>

        {/* Material Swatches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MATERIALS.map((mat, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-[#c5a880]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Visual Swatch Tile */}
                <div 
                  className="w-full h-32 rounded-xl mb-4 relative overflow-hidden shadow-inner flex items-end p-3 transition-transform group-hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: mat.colorHex,
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 0)',
                    backgroundSize: '8px 8px'
                  }}
                >
                  <span className="text-[9px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
                    {mat.category}
                  </span>
                </div>

                {/* Details */}
                <h4 className="font-editorial text-base font-bold text-white mb-1 group-hover:text-[#c5a880] transition-colors">
                  {mat.name}
                </h4>
                <div className="text-[10px] font-mono text-[#c5a880] mb-3">
                  ORIGIN: {mat.origin}
                </div>
                <p className="text-xs text-[#d8d2c4]/70 leading-relaxed font-sans mb-4">
                  {mat.texture}
                </p>
              </div>

              {/* Usage */}
              <div className="pt-3 border-t border-white/[0.07] text-[10px] font-mono text-white/40">
                <span className="text-white/60 block mb-0.5">Application:</span>
                {mat.usage}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="transformation-slider" className="py-28 px-6 md:px-12 bg-[#0c0e10] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight">
            From Raw Concrete to Refined Sanctuary
          </h2>
          <p className="mt-4 text-[#d8d2c4]/70 text-sm md:text-base leading-relaxed">
            Drag the divider to observe the total spatial evolution — witnessing how unformed industrial concrete and bare slabs become a harmonized master residence.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* AFTER Image (Full Completed Room) - Background */}
          <div className="absolute inset-0 w-full h-full bg-[#15171a]">
            {/* High-res frame representing the completed sanctuary */}
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/room_construction.mp4#t=5.0')`,
                backgroundColor: '#1b1e22'
              }}
            >
              <video
                src="/room_construction.mp4#t=4.8"
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => { e.target.currentTime = 4.8; }}
              />
            </div>
            {/* After Tag */}
            <div className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full glass-panel border border-[#c5a880]/40 text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>After: 04 / Experience</span>
            </div>
          </div>

          {/* BEFORE Image (Raw Concrete Shell) - Clipped Overlay */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            >
              <video
                src="/room_construction.mp4#t=0.2"
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => { e.target.currentTime = 0.2; }}
              />
            </div>
            
            {/* Before Tag */}
            <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full glass-panel border border-white/20 text-xs font-mono tracking-[0.2em] uppercase text-white/90">
              <span>Before: 01 / Architecture</span>
            </div>
          </div>

          {/* Vertical Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#f5f2eb] text-[#0c0e10] shadow-2xl flex items-center justify-center border-2 border-[#c5a880] group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-4 h-4 text-[#0c0e10]" />
            </div>
          </div>
        </div>

        {/* Drag Helper Label */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
          <MoveHorizontal className="w-4 h-4 text-[#c5a880]" />
          <span>Click & Drag to explore the architectural contrast</span>
        </div>

      </div>
    </section>
  );
}


import React from 'react';

export default function BrandLogo({ variant = 'compact', className = '' }) {
  if (variant === 'monumental' || variant === 'hero' || variant === 'center') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Soft Ambient Gold Glow */}
        <div className="absolute w-80 h-80 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none -translate-y-8" />

        {/* Exact Architectural Stone Portal (Real Travertine & Olive Lintel) */}
        <div className="relative mb-2 sm:mb-2.5 md:mb-3 transition-transform duration-700 hover:scale-105">
          <img
            src="/exact_door_mark.png"
            alt="FRAME STONE Portal"
            className="w-24 sm:w-32 md:w-40 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
          />
        </div>

        {/* Monumental Brand Typography - Guaranteed Single Line */}
        <div 
          className="font-editorial whitespace-nowrap font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#f5f2eb] leading-tight drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] select-none"
          style={{ fontSize: 'clamp(2rem, 6.2vw, 5.25rem)' }}
        >
          FRAME STONE
        </div>

        {/* Centered Subtitle with Fine Hairlines */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 w-full max-w-xl">
          <span className="w-8 sm:w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-[#c5a880]/60" />
          <span className="text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#c5a880] font-sans font-medium whitespace-nowrap drop-shadow">
            Interior Design Studio
          </span>
          <span className="w-8 sm:w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#c5a880] to-[#c5a880]/60" />
        </div>
      </div>
    );
  }

  // Compact stacked lockup for Navbar & Footer (Exact same stacked pattern as Hero reference)
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none flex-shrink-0 ${className}`}>
      {/* Exact Real Travertine & Olive Portal Door Mark on Top */}
      <img
        src="/exact_door_mark.png"
        alt="FRAME STONE"
        className="h-5 sm:h-5.5 md:h-6 w-auto object-contain flex-shrink-0 drop-shadow-md filter contrast-[1.05] mb-1 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Brand Typography */}
      <div className="font-editorial text-xs sm:text-[13.5px] md:text-[14px] font-bold tracking-[0.22em] text-[#f5f2eb] leading-tight whitespace-nowrap">
        FRAME STONE
      </div>

      {/* Centered Subtitle with Fine Golden Hairlines (Matching Image Reference Exactly) */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-0.5 whitespace-nowrap">
        <span className="w-2.5 sm:w-4 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
        <span className="text-[6.5px] sm:text-[7px] tracking-[0.28em] uppercase text-[#c5a880] font-sans font-medium">
          Interior Design Studio
        </span>
        <span className="w-2.5 sm:w-4 h-[1px] bg-gradient-to-l from-transparent via-[#c5a880] to-transparent" />
      </div>
    </div>
  );
}

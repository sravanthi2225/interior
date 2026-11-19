import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Sparkles, Check } from 'lucide-react';

export default function Footer({ onNavigateToProjects, onOpenStoryboard }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#070809] border-t border-white/[0.08] text-[#d8d2c4] pt-20 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12 relative overflow-hidden selection:bg-[#c5a880] selection:text-[#0c0e10]">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#c5a880]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[#3d2b1f]/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ======================================================== */}
        {/* 1. TOP STATEMENT & MONOGRAPH NEWSLETTER STRIP            */}
        {/* ======================================================== */}
        <div className="pb-14 sm:pb-20 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          {/* Monumental Atelier Sign-off */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#c5a880]/30 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Haute Interior Architecture & Spatial Craft</span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight max-w-xl drop-shadow-md">
              Turning Raw Concrete Into Timeless Spatial Poetry
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#d8d2c4]/70 font-sans font-light max-w-lg leading-relaxed">
              Every commission begins with structural volume, acoustic calibration, and honest materiality. Operating across London, Milan, and South India’s premier corridors.
            </p>
          </div>

          {/* Private Monograph Dispatch Subscription Box */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/10 bg-[#0e1013]/90 shadow-xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a880] block mb-1">
                Private Atelier Monograph
              </span>
              <p className="text-xs text-[#d8d2c4]/75 font-sans mb-4 leading-relaxed">
                Receive our quarterly publication detailing rare travertine sourcing, acoustic joinery, and private project handovers.
              </p>

              {subscribed ? (
                <div className="py-2.5 px-4 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/50 text-xs font-mono text-[#c5a880] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c5a880]" />
                  <span>Your invitation has been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    required
                    className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/15 text-xs font-sans text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#f5f2eb] hover:bg-[#c5a880] text-[#0c0e10] text-[11px] font-sans font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md hover:scale-105"
                  >
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 2. MAIN ATELIER NAVIGATION COLUMNS                       */}
        {/* ======================================================== */}
        <div className="py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 border-b border-white/[0.08]">
          
          {/* Brand Identity & Global Presence */}
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo />
            
            <p className="text-xs sm:text-sm text-[#d8d2c4]/70 max-w-sm leading-relaxed font-sans font-light">
              FRAME STONE is an haute-couture interior design and architectural atelier dedicated to the craft of converting raw industrial envelopes into serene, sculpted master residences and landmark hospitality destinations.
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880]">
                Global Studio Coordinates
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#d8d2c4]/90">
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">LONDON · MAYFAIR</span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">MILAN · BRERA</span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">HYDERABAD · JUBILEE HILLS</span>
              </div>
            </div>
          </div>

          {/* Portfolio & Spatial Works */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[#c5a880] mb-4 font-semibold">
              Curated Portfolio
            </h4>
            <ul className="space-y-3 text-xs text-[#d8d2c4]/75 font-sans">
              <li>
                <a href="#projects" className="hover:text-white hover:text-[#c5a880] transition-colors flex items-center justify-between group">
                  <span>Hospitality Archive (08)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white hover:text-[#c5a880] transition-colors flex items-center justify-between group">
                  <span>Residential Sanctuaries</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#hero-experience" className="hover:text-white hover:text-[#c5a880] transition-colors flex items-center justify-between group">
                  <span>Spatial Metamorphosis</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white hover:text-[#c5a880] transition-colors flex items-center justify-between group">
                  <span>Bespoke Materiality</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial Hospitality Typologies */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[#c5a880] mb-4 font-semibold">
              Commercial Scope
            </h4>
            <ul className="space-y-3 text-xs text-[#d8d2c4]/75 font-sans">
              <li><span className="text-[#d8d2c4]/80">Haute Fine-Dining Venues</span></li>
              <li><span className="text-[#d8d2c4]/80">Atmospheric Cocktail Bars</span></li>
              <li><span className="text-[#d8d2c4]/80">Specialty Coffee Roasteries</span></li>
              <li><span className="text-[#d8d2c4]/80">Monumental Banquet Halls</span></li>
              <li><span className="text-[#d8d2c4]/80">Studio Custom Joinery</span></li>
            </ul>
          </div>

          {/* Atelier Contact & Inquiries */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[#c5a880] mb-4 font-semibold">
              Private Consultations
            </h4>
            <ul className="space-y-3 text-xs text-[#d8d2c4]/75 font-mono">
              <li className="flex items-center gap-2 text-white/90">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#c5a880] transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <Mail className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                <a href="mailto:atelier@framestone.studio" className="hover:text-[#c5a880] transition-colors">atelier@framestone.studio</a>
              </li>
              <li className="flex items-start gap-2 text-[#d8d2c4]/70 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-tight">Road No. 36, Jubilee Hills, Hyderabad</span>
              </li>
              <li className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c5a880] hover:text-white transition-colors underline underline-offset-4"
                >
                  <span>Book Private Consultation</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM COPYRIGHT & LEGAL BAR                          */}
        {/* ======================================================== */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} FRAME STONE INTERIOR DESIGN STUDIO.</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="text-[#c5a880]/70">LONDON · MILAN · HYDERABAD</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-[#c5a880] text-white/70 hover:text-[#0c0e10] border border-white/10 hover:border-[#c5a880] transition-all cursor-pointer group shadow-sm"
          >
            <span className="text-[10px] tracking-widest uppercase">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

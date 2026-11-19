import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, Sparkles } from 'lucide-react';

export default function ConsultationCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    scope: 'Full Residence Transformation'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-[#090b0c] relative border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-8 md:p-16 glass-panel border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Subtle gold glow behind card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#475440]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Commission</span>
              </div>
              
              <h2 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight mb-4">
                Begin Your Spatial Journey
              </h2>
              
              <p className="text-sm md:text-base text-[#d8d2c4]/75 font-sans leading-relaxed mb-6">
                We accept a limited portfolio of private residences and boutique architectural commissions each calendar year. Request a private design consultation with our principal studio.
              </p>

              <div className="space-y-3 font-mono text-xs text-white/60">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>STUDIOS: LONDON · MILAN · NEW YORK</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>PROJECT TIMELINES: 6 TO 18 MONTHS</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>CONFIDENTIAL CLIENT PRIVACY GUARANTEED</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0c0e10]/80 border border-white/10 backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-white mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#d8d2c4]/70 font-sans max-w-xs">
                    Our lead architectural partner will review your inquiry and reach out within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-1.5">
                      Client / Representative Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Julian Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-xs font-sans focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-1.5">
                      Confidential Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@privateoffice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-xs font-sans focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-1.5">
                      Property City / Country
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Knightsbridge, London"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-xs font-sans focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-1.5">
                      Transformation Scope
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141619] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
                    >
                      <option>Full Residence Transformation</option>
                      <option>Penthouse / Master Living Suite</option>
                      <option>Historic Architecture Restoration</option>
                      <option>Custom Joinery & Lighting Commission</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-[#c5a880] hover:bg-[#d8be96] text-[#0c0e10] font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_rgba(197,168,128,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Private Consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


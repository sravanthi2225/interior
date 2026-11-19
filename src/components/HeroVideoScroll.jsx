import React, { useRef, useState, useEffect, useCallback } from 'react';
import BrandLogo from './BrandLogo';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sliders, 
  ChevronDown, 
  Sparkles, 
  Compass, 
  Layers,
  Maximize2
} from 'lucide-react';

export const STORYBOARD_STAGES = [
  {
    id: 1,
    timeRange: '0.0 – 0.6s',
    startTime: 0.0,
    endTime: 0.6,
    smallLabel: '01 / ARCHITECTURE',
    pill: 'PHASE 01 · ARCHITECTURE',
    headline: '',
    subline: '',
    roomState: 'Raw concrete shell, exposed ceiling, ladder, wood planks, dust, harsh daylight',
    specs: ['Raw cast concrete core', 'Exposed mechanical ceiling', 'Harsh natural daylight', 'Raw architectural canvas'],
    accentColor: '#c5a880',
    phaseName: 'Architecture'
  },
  {
    id: 2,
    timeRange: '0.6 – 2.0s',
    startTime: 0.6,
    endTime: 2.0,
    smallLabel: '02 / STRUCTURE',
    pill: 'PHASE 02 · STRUCTURE',
    headline: 'PRECISION MEETS DESIGN',
    subline: 'Linear Track Optics · French Oak Parquet',
    roomState: 'Ceiling smooths over and linear LED track lights glow. Oak floor appears and the TV wall gets warm cove lighting. Planks are still on the floor',
    specs: ['Flush skimmed ceilings', 'Linear micro-track lights (3000K)', 'European herringbone oak floor', 'Warm perimeter cove luminescence'],
    accentColor: '#c5a880',
    phaseName: 'Structure'
  },
  {
    id: 3,
    timeRange: '2.0 – 3.0s',
    startTime: 2.0,
    endTime: 3.0,
    smallLabel: null,
    pill: 'PHASE 02.5 · ILLUMINATION',
    headline: 'THE ARCHITECTURAL GLOW',
    subline: 'Recessed Cove Warmth · Floating Joinery',
    roomState: 'Lit shelves appear beside the TV, the floor is cleaned and a low sofa starts to appear',
    specs: ['Backlit acoustic shelving', 'Polished parquet clearance', 'Architectural recess reveals', 'Low lounge form inception'],
    accentColor: '#c5a880',
    phaseName: 'Interlude'
  },
  {
    id: 4,
    timeRange: '3.0 – 3.6s',
    startTime: 3.0,
    endTime: 3.6,
    smallLabel: '03 / FURNISHINGS',
    pill: 'PHASE 03 · FURNISHINGS',
    headline: 'MODERN LIVING',
    subline: 'Monolithic Travertine · Curated Italian Upholstery',
    roomState: 'Sofa, coffee table, armchairs, wall art and books appear',
    specs: ['Bespoke Italian modular sofa', 'Monolithic travertine table', 'Sculptural terracotta lounge armchairs', 'Curated art & rare books'],
    accentColor: '#c5a880',
    phaseName: 'Furnishings'
  },
  {
    id: 5,
    timeRange: '3.6 – 4.6s',
    startTime: 3.6,
    endTime: 4.6,
    smallLabel: '04 / EXPERIENCE',
    pill: 'PHASE 04 · EXPERIENCE',
    headline: 'WELCOME HOME',
    subline: 'Living Botanical Sanctuary · Bespoke Atmosphere',
    roomState: 'Fully styled room with plants, cushions and glowing shelves',
    specs: ['Ficus Lyrata botanical installation', 'Tactile Belgian linen & cashmere', 'Warm dimming scene calibration', 'Holistic bespoke residence'],
    accentColor: '#c5a880',
    phaseName: 'Experience'
  }
];

export default function HeroVideoScroll({ onStageChange }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Playback & Scrub state
  const [targetTime, setTargetTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(STORYBOARD_STAGES[0]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [fullRangeMode, setFullRangeMode] = useState(false); // 4.6s storyboard vs 10s full video
  
  const maxScrubTime = fullRangeMode ? 10.0 : 4.6;
  const currentSeekRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Sync stage based on currentTime
  const determineStage = useCallback((time) => {
    if (time < 0.6) return STORYBOARD_STAGES[0];
    if (time < 2.0) return STORYBOARD_STAGES[1];
    if (time < 3.0) return STORYBOARD_STAGES[2];
    if (time < 3.6) return STORYBOARD_STAGES[3];
    return STORYBOARD_STAGES[4];
  }, []);

  // Smooth lerp loop for video seeking & display updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const renderLoop = () => {
      if (!isPlaying) {
        // Fast, responsive lerp towards target scrub time so video never lags behind scroll
        const diff = targetTime - currentSeekRef.current;
        if (Math.abs(diff) > 0.003) {
          currentSeekRef.current += diff * 0.35;
          if (video.readyState >= 2 && !video.seeking) {
            video.currentTime = Math.max(0, Math.min(video.duration || 10, currentSeekRef.current));
          }
        }
      } else {
        currentSeekRef.current = video.currentTime;
      }

      const activeTime = video.currentTime || 0;
      setDisplayTime(activeTime);
      
      const stg = determineStage(activeTime);
      setCurrentStage(stg);
      if (onStageChange) onStageChange(stg);

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying, targetTime, determineStage, onStageChange]);

  // Handle scroll to scrub
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return; // scroll scrub is paused if user explicitly clicked auto-play
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      setScrollProgress(progress);

      // Dedicated Transformation Runway & Completion Gate:
      // All 4 phases transform smoothly from progress 0.0 to 0.82.
      // From 0.82 to 1.0, the final finished sanctuary ("Welcome Home") remains 100% complete and fully visible.
      // Section 2 (Collections) will only move up into view AFTER this scrolling transformation is 100% completed.
      const videoProgress = Math.min(1, progress / 0.82);
      setTargetTime(videoProgress * maxScrubTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, maxScrubTime]);

  // Video load event
  const handleLoadedMetadata = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Toggle Auto-Play vs Scrub
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // If at end, loop back
      if (video.currentTime >= maxScrubTime - 0.1) {
        video.currentTime = 0;
        currentSeekRef.current = 0;
      }
      video.playbackRate = playbackSpeed;
      video.play().catch(e => console.log('Autoplay prevented:', e));
      setIsPlaying(true);
    }
  };

  // Jump directly to a stage
  const jumpToStage = (stage) => {
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();

    const container = containerRef.current;
    if (!container) return;

    const targetFraction = (stage.startTime / maxScrubTime) * 0.82;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScrollY = container.offsetTop + targetFraction * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    setTargetTime(stage.startTime);
  };

  // Audio ambient chime toggle (synthesized luxury architectural soundscape)
  const toggleAudio = () => {
    if (isMuted) {
      setIsMuted(false);
      try {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } catch (err) {
        console.log('Audio init', err);
      }
    } else {
      setIsMuted(true);
    }
  };

  // Reset to beginning
  const handleReset = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    const container = containerRef.current;
    if (container) {
      window.scrollTo({ top: container.offsetTop, behavior: 'smooth' });
    }
    setTargetTime(0);
    currentSeekRef.current = 0;
  };

  return (
    <section
      id="hero-experience"
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#0c0e10]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Background Video Layer */}
        <div className="absolute inset-0 w-full h-full bg-[#0c0e10]">
          <video
            ref={videoRef}
            src="/room_construction.mp4"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.03] scale-[1.10] origin-center"
            playsInline
            muted
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Luxury Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-transparent to-[#0c0e10]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e10]/80 via-transparent to-[#0c0e10]/60 pointer-events-none" />
          <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

          {/* Watermark-Eliminating Dark Corner Shield */}
          <div className="absolute bottom-0 right-0 w-52 h-52 bg-gradient-to-tl from-[#0c0e10] via-[#0c0e10]/80 to-transparent pointer-events-none z-10" />

          {/* Vignette border */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
        </div>


        {/* Center / Primary Animated Typography Stage Content */}
        <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 my-auto max-w-7xl mx-auto flex flex-col items-center justify-center pt-10 sm:pt-14 md:pt-16 translate-y-4 sm:translate-y-8 md:translate-y-10">
          {currentStage.id === 1 ? (
            /* STAGE 1: Monumental Centered Brand Presentation */
            <div className="w-full flex flex-col items-center justify-center text-center transition-all duration-700 ease-out animate-in fade-in zoom-in-95">
              <BrandLogo variant="monumental" />
              
              {/* Subtle Scroll Cue */}
              <div className="mt-8 sm:mt-12 flex flex-col items-center gap-2 text-white/60 animate-bounce">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880]/90">
                  Scroll To Transform Space
                </span>
                <ChevronDown className="w-4 h-4 text-[#c5a880]" />
              </div>
            </div>
          ) : (
            /* STAGES 2, 3, 4, 5: Luxury Centered Presentation */
            <div className="w-full flex flex-col items-center justify-center text-center transition-all duration-700 ease-out animate-in fade-in zoom-in-95 max-w-5xl mx-auto relative">
              
              {/* Diffuse Warm Ambient Glow Behind Text */}
              <div 
                className="absolute w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-25 -translate-y-4"
                style={{ backgroundColor: currentStage.accentColor || '#c5a880' }}
              />


              {/* Majestic Headline - Single Line / Fluid Clamp / Metallic Ivory-Gold Gradient Sheen */}
              {currentStage.headline && (
                <h2
                  className="font-editorial font-bold tracking-[0.12em] sm:tracking-[0.16em] leading-tight drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] bg-gradient-to-b from-white via-[#F5F2EB] to-[#DFCCA8] bg-clip-text text-transparent whitespace-nowrap select-none"
                  style={{ fontSize: 'clamp(1.85rem, 5.2vw, 4.5rem)' }}
                >
                  {currentStage.headline}
                </h2>
              )}

              {/* Refined Architectural Subline Flanked by Hairlines */}
              {currentStage.subline && (
                <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 w-full max-w-2xl px-4">
                  <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/70 to-[#c5a880]/30" />
                  <span className="text-xs sm:text-sm font-sans tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#d8d2c4]/90 font-light whitespace-nowrap drop-shadow">
                    {currentStage.subline}
                  </span>
                  <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#c5a880]/70 to-[#c5a880]/30" />
                </div>
              )}

            </div>
          )}
        </div>

        {/* Subtle razor-thin progress hairline at the absolute bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#414b3d] via-[#c5a880] to-[#f5f2eb] transition-all duration-100"
            style={{ width: `${(displayTime / maxScrubTime) * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}


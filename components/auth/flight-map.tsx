import React from "react";

export function FlightMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-cyan-950/20 via-zinc-900/30 to-transparent border border-zinc-800/40 p-4 ${className}`}
    >
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[160px] drop-shadow-sm select-none"
      >
        <defs>
          {/* Flight trajectory gradients */}
          <linearGradient id="flightGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="secondaryTrajectory" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radar / Coordinate grid lines */}
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="3 3">
          <line x1="20" y1="60" x2="380" y2="60" />
          <line x1="20" y1="120" x2="380" y2="120" />
          <line x1="20" y1="180" x2="380" y2="180" />
          <line x1="120" y1="20" x2="120" y2="220" />
          <line x1="220" y1="20" x2="220" y2="220" />
          <line x1="320" y1="20" x2="320" y2="220" />
        </g>

        {/* Stylized Europe Map Outline */}
        <path
          d="M 175,25 
             C 185,22 195,20 205,22 
             C 215,24 220,18 230,20 
             C 240,23 250,28 255,35 
             C 252,42 245,45 240,48 
             C 235,52 228,50 220,55 
             C 212,60 205,58 198,62 
             C 190,65 182,60 178,52 
             C 174,44 170,35 175,25 Z"
          fill="rgba(255, 255, 255, 0.06)"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* Stylized Africa Map Outline */}
        <path
          d="M 180,68 
             C 195,65 215,64 235,66 
             C 245,70 252,78 250,90 
             C 248,105 255,115 250,130 
             C 242,150 235,170 225,190 
             C 220,200 212,210 205,215 
             C 200,210 195,195 190,180 
             C 185,160 175,145 168,135 
             C 155,130 145,120 148,105 
             C 150,92 165,80 172,72 
             Z"
          fill="rgba(255, 255, 255, 0.06)"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* Secondary subtle route (North Africa to Europe) */}
        <path
          d="M 195,85 Q 210,60 225,42"
          fill="none"
          stroke="url(#secondaryTrajectory)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Primary Flight Trajectory: Sub-Saharan/West/Central Africa -> Europe */}
        <path
          d="M 175,130 Q 185,75 225,40"
          fill="none"
          stroke="url(#flightGradient)"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          className="animate-pulse"
        />

        {/* Tertiary Trajectory: East Africa -> Europe */}
        <path
          d="M 235,125 Q 240,75 228,42"
          fill="none"
          stroke="url(#secondaryTrajectory)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Departure Point 1 (West/Central Africa) */}
        <circle cx="175" cy="130" r="10" fill="url(#cyanGlow)" />
        <circle cx="175" cy="130" r="3.5" fill="#06b6d4" />
        <circle cx="175" cy="130" r="1.5" fill="#ffffff" />

        {/* Departure Point 2 (East Africa) */}
        <circle cx="235" cy="125" r="2.5" fill="#38bdf8" opacity="0.8" />

        {/* Departure Point 3 (North Africa) */}
        <circle cx="195" cy="85" r="2.5" fill="#38bdf8" opacity="0.8" />

        {/* Arrival Destination (Europe / Suisse / France) */}
        <circle cx="225" cy="40" r="14" fill="url(#cyanGlow)" />
        <circle cx="225" cy="40" r="4" fill="#38bdf8" />
        <circle cx="225" cy="40" r="2" fill="#ffffff" />

        {/* Airplane Icon on trajectory curve */}
        <g transform="translate(196, 68) rotate(-48)">
          <path
            d="M 0,-6 L 2,-1 L 6,1 L 2,2 L 1,6 L 0,5 L -1,6 L -2,2 L -6,1 L -2,-1 Z"
            fill="#22d3ee"
          />
        </g>

        {/* Label badges */}
        <g className="text-[9px] font-medium fill-zinc-400 select-none">
          <text x="120" y="145" fill="#a1a1aa" fontSize="9">Afrique</text>
          <text x="245" y="35" fill="#38bdf8" fontSize="9" fontWeight="600">Europe</text>
        </g>
      </svg>

      {/* Floating Status Pill */}
      <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/50 text-[10px] text-zinc-300 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Mobilité Médicale Active</span>
      </div>
    </div>
  );
}

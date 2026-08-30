import React from "react";

export function FlightMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e131b] via-[#0a0d13] to-[#07090d] border border-zinc-800/80 p-5 shadow-2xl ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-1/3 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of the map */}
      <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold text-zinc-200 tracking-wide text-[11px] uppercase">
            Corridor Médical Afrique &rarr; Europe
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-[10px] text-cyan-300 font-mono">
          <span>MEBEKO &bull; FFI &bull; PhD</span>
        </div>
      </div>

      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[220px] drop-shadow-md select-none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="mainFlightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="secondaryFlightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="destGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Global coordinate grid lines */}
        <g stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" strokeDasharray="3 3">
          <line x1="30" y1="50" x2="490" y2="50" />
          <line x1="30" y1="110" x2="490" y2="110" />
          <line x1="30" y1="180" x2="490" y2="180" />
          <line x1="30" y1="260" x2="490" y2="260" />
          <line x1="100" y1="20" x2="100" y2="320" />
          <line x1="200" y1="20" x2="200" y2="320" />
          <line x1="300" y1="20" x2="300" y2="320" />
          <line x1="400" y1="20" x2="400" y2="320" />
        </g>

        {/* ================= EUROPE ACCURATE VECTOR SILHOUETTE ================= */}
        <g id="europe-map" fill="#131924" stroke="#2a384f" strokeWidth="0.8">
          {/* United Kingdom & Ireland */}
          <path d="M 215,36 C 218,28 225,24 230,28 C 235,32 232,45 228,52 C 224,56 218,52 215,46 Z" />
          <path d="M 205,38 C 208,35 212,37 210,44 C 207,48 203,45 205,38 Z" />

          {/* Scandinavia */}
          <path d="M 265,12 C 275,8 285,12 292,20 C 298,30 292,42 284,48 C 278,50 272,42 268,34 C 264,24 260,18 265,12 Z" />

          {/* Western & Central Europe: Spain, France, Germany, Switzerland, Italy, Central Europe */}
          <path
            d="M 188,78 
               C 192,70 205,68 214,68 
               C 220,62 228,58 238,58 
               C 246,55 258,58 268,62 
               C 280,60 292,64 305,68 
               C 320,72 335,80 340,92 
               C 335,98 322,102 312,102 
               C 300,105 292,112 282,108 
               C 275,105 272,115 268,122 
               C 264,128 258,125 255,118 
               C 252,108 248,102 242,102 
               C 235,102 228,105 220,102 
               C 205,105 195,100 188,95 
               C 182,90 184,82 188,78 Z"
          />

          {/* Iberian Peninsula (Spain / Portugal) */}
          <path
            d="M 188,78 
               C 192,72 205,74 208,80 
               C 212,88 205,98 198,105 
               C 188,110 178,108 174,98 
               C 172,88 180,82 188,78 Z"
          />

          {/* Italy Peninsula */}
          <path
            d="M 252,95 
               C 258,98 264,105 268,115 
               C 272,122 268,128 262,125 
               C 258,120 252,110 248,102 Z"
          />
        </g>

        {/* ================= AFRICA ACCURATE VECTOR SILHOUETTE ================= */}
        <g id="africa-map" fill="#121822" stroke="#273549" strokeWidth="0.8">
          {/* Main Continental Africa */}
          <path
            d="M 195,122 
               C 210,118 235,116 260,118 
               C 278,116 300,120 318,126 
               C 328,135 330,148 335,160 
               C 342,172 355,182 358,198 
               C 355,212 342,225 335,238 
               C 328,252 318,270 305,285 
               C 295,298 285,308 274,312 
               C 265,305 258,290 252,275 
               C 248,255 240,240 234,225 
               C 228,212 215,205 205,198 
               C 192,192 180,188 168,185 
               C 152,180 142,168 145,152 
               C 148,140 162,130 175,126 
               C 182,124 190,122 195,122 Z"
          />

          {/* Internal regional border accents */}
          <path
            d="M 195,122 C 215,145 235,150 255,150 M 255,150 C 265,180 270,210 268,250 M 205,198 C 225,200 245,215 255,240 M 274,312 C 280,270 295,230 318,180"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Madagascar */}
          <path
            d="M 345,245 
               C 350,238 355,242 358,252 
               C 362,268 355,285 348,295 
               C 342,298 338,290 340,278 
               C 342,265 340,252 345,245 Z"
          />
        </g>

        {/* ================= FLIGHT TRAJECTORIES (ARCS) ================= */}

        {/* Route 1 (Primary Highlight): Yaoundé / Douala / Abidjan -> Suisse & France */}
        <path
          d="M 215,195 Q 210,120 248,78"
          fill="none"
          stroke="url(#mainFlightGrad)"
          strokeWidth="2.5"
          strokeDasharray="5 3"
          className="animate-pulse"
        />

        {/* Route 2: Dakar (West Africa) -> Paris / Europe */}
        <path
          d="M 155,160 Q 175,100 236,68"
          fill="none"
          stroke="url(#secondaryFlightGrad)"
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />

        {/* Route 3: Central & East Africa (Kinshasa / Nairobi) -> Genève / Suisse */}
        <path
          d="M 268,225 Q 285,140 255,80"
          fill="none"
          stroke="url(#secondaryFlightGrad)"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />

        {/* Route 4: Maghreb (Casablanca / Alger / Tunis) -> Europe */}
        <path
          d="M 210,132 Q 225,98 245,78"
          fill="none"
          stroke="url(#secondaryFlightGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* ================= HUBS & PULSING PINS ================= */}

        {/* Departure Hub 1: Golf de Guinée (Yaoundé / Abidjan / Douala) */}
        <circle cx="215" cy="195" r="14" fill="url(#hubGlow)" />
        <circle cx="215" cy="195" r="4" fill="#06b6d4" />
        <circle cx="215" cy="195" r="1.5" fill="#ffffff" />
        <text x="145" y="210" fill="#a1a1aa" fontSize="9" fontWeight="500">
          Afrique Centrale &amp; Ouest
        </text>

        {/* Departure Hub 2: Dakar (Sénégal) */}
        <circle cx="155" cy="160" r="3" fill="#38bdf8" />
        <circle cx="155" cy="160" r="1" fill="#ffffff" />
        <text x="105" y="163" fill="#71717a" fontSize="8">Dakar</text>

        {/* Departure Hub 3: Afrique Centrale / RDC */}
        <circle cx="268" cy="225" r="3" fill="#38bdf8" opacity="0.8" />
        <circle cx="268" cy="225" r="1" fill="#ffffff" />

        {/* Departure Hub 4: Maghreb */}
        <circle cx="210" cy="132" r="3" fill="#38bdf8" opacity="0.8" />
        <text x="160" y="135" fill="#71717a" fontSize="8">Casablanca</text>

        {/* Destination Europe: Suisse (MEBEKO / Genève / Zurich) */}
        <circle cx="255" cy="80" r="16" fill="url(#destGlow)" />
        <circle cx="255" cy="80" r="4.5" fill="#38bdf8" />
        <circle cx="255" cy="80" r="2" fill="#ffffff" />
        <rect
          x="268"
          y="70"
          width="78"
          height="20"
          rx="4"
          fill="#0c121e"
          stroke="#0284c7"
          strokeWidth="0.8"
        />
        <text x="274" y="83" fill="#38bdf8" fontSize="8.5" fontWeight="600">
          Suisse &bull; MEBEKO
        </text>

        {/* Destination Europe: France (Paris / FFI) */}
        <circle cx="236" cy="68" r="10" fill="url(#destGlow)" opacity="0.8" />
        <circle cx="236" cy="68" r="3.5" fill="#67e8f9" />
        <circle cx="236" cy="68" r="1.5" fill="#ffffff" />
        <text x="210" y="58" fill="#e2e8f0" fontSize="8.5" fontWeight="500">
          France / FFI
        </text>

        {/* ================= ANIMATED AIRPLANE ICON ================= */}
        <g transform="translate(228, 126) rotate(-45)">
          <path
            d="M 0,-7 L 2.5,-1.5 L 7,1 L 2.5,2.5 L 1.2,7 L 0,6 L -1.2,7 L -2.5,2.5 L -7,1 L -2.5,-1.5 Z"
            fill="#22d3ee"
            stroke="#083344"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

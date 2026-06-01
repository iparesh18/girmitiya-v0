import React, { useRef } from 'react';

export default function EarthModel() {
  const wrapRef = useRef(null);

  const handlePointerDown = (e) => {
    if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing';
  };
  const handlePointerUp = (e) => {
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab';
  };

  return (
    <div ref={wrapRef} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} className="relative h-full w-full" style={{ cursor: 'grab' }}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(212,160,23,0.18),transparent_68%)] blur-2xl" />
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),transparent_42%),radial-gradient(circle_at_70%_70%,rgba(212,160,23,0.12),transparent_38%)]" />
      <model-viewer
        className="relative h-full w-full"
        src="/models/earth2.glb"
        alt="3D Earth globe"
        auto-rotate
        auto-rotate-delay="0"
        camera-controls
        shadow-intensity="0"
        exposure="1"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

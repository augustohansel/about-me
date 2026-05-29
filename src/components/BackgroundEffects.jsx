const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${Math.random() * 10 + 10}s`,
  delay: `${Math.random() * 5}s`,
}));

export function BackgroundEffects({ mousePos }) {
  const tx = (mousePos.x / window.innerWidth - 0.5) * -20;
  const ty = (mousePos.y / window.innerHeight - 0.5) * -20;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[40] transition-opacity duration-300"
        style={{
          background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -top-[50px] -left-[50px] z-[30]"
        style={{
          width: 'calc(100% + 100px)',
          height: 'calc(100% + 100px)',
          transform: `translate3d(${tx}px, ${ty}px, 0)`,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-[20]">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-float shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
            style={{
              left: p.left,
              top: p.top,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
import { useRef } from 'react';
import { Github, Globe } from 'lucide-react';

export function ProjectCard({ project, liveLabel, repoLabel, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${x}%`);
    cardRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col animate-slide-down hover:border-zinc-800 transition-colors duration-300"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.04), transparent 60%)',
        }}
      />

      <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 border-b border-zinc-900">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase text-zinc-500 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-sm">
          {project.type}
        </span>
        {project.live && (
          <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] text-emerald-600 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_6px_#059669]" />
            {liveLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-sm font-bold text-zinc-200 leading-snug">{project.name}</h3>
        <p className="text-xs text-zinc-600 leading-relaxed flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 border border-zinc-800 rounded-full text-zinc-600"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-1 border-t border-zinc-900">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <Globe size={12} />
              {liveLabel}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <Github size={12} />
              {repoLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
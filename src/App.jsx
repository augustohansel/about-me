import { useState } from 'react';
import { Github, Mail, FileText, MessageCircle } from 'lucide-react';

import { CONTENT } from './data/content';
import { useMousePosition } from './hooks/useMousePosition';
import { BackgroundEffects } from './components/BackgroundEffects';
import { ProjectCard } from './components/ProjectCard';

const ActionButton = ({ href, icon: Icon, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all text-sm text-zinc-300"
  >
    <Icon size={16} />
    {text}
  </a>
);

const LanguageSwitcher = ({ lang, setLang }) => (
  <div className="flex bg-zinc-900 border border-zinc-800 rounded-md mb-6 overflow-hidden animate-slide-down">
    <button
      onClick={() => setLang('pt')}
      className={`px-3 py-1 transition-colors ${lang === 'pt' ? 'bg-zinc-800/50' : 'hover:bg-zinc-800 opacity-50 hover:opacity-100'}`}
    >
      🇧🇷
    </button>
    <button
      onClick={() => setLang('en')}
      className={`px-3 py-1 transition-colors ${lang === 'en' ? 'bg-zinc-800/50' : 'hover:bg-zinc-800 opacity-50 hover:opacity-100'}`}
    >
      🇺🇸
    </button>
  </div>
);

const FilterRow = ({ filters, active, onSelect }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-8">
    {filters.map((f) => (
      <button
        key={f}
        onClick={() => onSelect(f)}
        className={`text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border transition-all duration-200 ${
          f === active
            ? 'border-zinc-600 text-zinc-300 bg-zinc-900'
            : 'border-zinc-900 text-zinc-700 hover:border-zinc-700 hover:text-zinc-400'
        }`}
      >
        {f}
      </button>
    ))}
  </div>
);

export default function App() {
  const [lang, setLang] = useState('pt');
  const [activeFilter, setActiveFilter] = useState('todos');
  const mousePos = useMousePosition();
  const t = CONTENT[lang];

  const handleSetLang = (l) => {
    setLang(l);
    setActiveFilter(CONTENT[l].allKey);
  };

  const filtered =
    activeFilter === t.allKey
      ? t.projects
      : t.projects.filter((p) => p.type === activeFilter);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden cursor-none [&_*]:cursor-none">
      <BackgroundEffects mousePos={mousePos} />

      {/* cursor customizado */}
      <div
        className="pointer-events-none fixed z-[100] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.6)]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <main className="z-[50] flex flex-col items-center w-full max-w-5xl">
        {/* hero */}
        <div className="flex flex-col items-center mb-16 pt-12">
          <LanguageSwitcher lang={lang} setLang={handleSetLang} />

          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight animate-slide-down text-center">
            Augusto Preuss Hansel
          </h1>

          <p
            className="text-zinc-500 text-sm md:text-base mb-10 animate-slide-down"
            style={{ animationDelay: '0.2s' }}
          >
            {t.role}
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 animate-slide-down"
            style={{ animationDelay: '0.4s' }}
          >
            <ActionButton href="https://wa.me/5551997523087" icon={MessageCircle} text={t.wa} />
            <ActionButton href="mailto:augustoph34@gmail.com" icon={Mail} text={t.email} />
            <ActionButton href={t.cvLink} icon={FileText} text={t.cv} />
            <ActionButton href="https://github.com/augustohansel" icon={Github} text="GitHub" />
          </div>
        </div>

        {/* seção projetos */}
        <section className="w-full">
          <div
            className="flex items-center gap-4 mb-8 animate-slide-down"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="flex-1 h-px bg-zinc-900" />
            <span className="text-xs text-zinc-700 tracking-[0.2em]">{t.secProjects}</span>
            <div className="flex-1 h-px bg-zinc-900" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                liveLabel={t.liveLabel}
                repoLabel={t.repoLabel}
                index={i}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="https://github.com/augustohansel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors duration-200 group"
            >
              <span className="text-zinc-800 group-hover:text-zinc-500 transition-colors">+</span>
              {t.moreOnGithub}
              <Github size={50} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

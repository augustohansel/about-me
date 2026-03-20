import { useState, useEffect } from 'react';
import { Github, Mail, FileText, MessageCircle } from 'lucide-react';

const CONTENT = {
  pt: {
    role: "Desenvolvedor Full Stack 🚀",
    whatsapp: "WhatsApp",
    email: "E-mail",
    resume: "Currículo",
  },
  en: {
    role: "Full Stack Developer 🚀",
    whatsapp: "WhatsApp",
    email: "Email",
    resume: "Resume",
  }
};

const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${Math.random() * 10 + 10}s`,
  delay: `${Math.random() * 5}s`,
}));

function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePos;
}

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
  <div 
    className="flex bg-zinc-900 border border-zinc-800 rounded-md mb-6 overflow-hidden animate-slide-down"
    style={{ animationDelay: '0.2s' }}
  >
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

const BackgroundEffects = ({ mousePos }) => {
  const parallaxOffset = 20; 
  const tx = (mousePos.x / window.innerWidth - 0.5) * -parallaxOffset;
  const ty = (mousePos.y / window.innerHeight - 0.5) * -parallaxOffset;

  return (
    <>
      <div 
        className="pointer-events-none fixed inset-0 z-[40] transition-opacity duration-300"
        style={{ background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)` }}
      />
      
      <div 
        className="pointer-events-none absolute -top-[50px] -left-[50px] z-[30]"
        style={{
          width: 'calc(100% + 100px)', 
          height: 'calc(100% + 100px)', 
          transform: `translate3d(${tx}px, ${ty}px, 0)`,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-[20]">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-float shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
            style={{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}
      </div>
    </>
  );
};

function App() {
  const [lang, setLang] = useState('pt');
  const mousePos = useMousePosition();
  const t = CONTENT[lang];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden cursor-none [&_*]:cursor-none">
      
      <BackgroundEffects mousePos={mousePos} />

      <div 
        className="pointer-events-none fixed z-[100] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.6)]"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
      />

      <main className="z-[50] flex flex-col items-center w-full">
        
        <LanguageSwitcher lang={lang} setLang={setLang} />

        <h1 
          className="text-4xl md:text-5xl font-bold mb-3 tracking-tight animate-slide-down text-center"
          style={{ animationDelay: '0.5s' }}
        >
          Augusto Preuss Hansel
        </h1>

        <p 
          className="text-zinc-400 text-sm md:text-base mb-10 flex items-center gap-2 animate-slide-down"
          style={{ animationDelay: '0.8s' }}
        >
          {t.role}
        </p>

        <div 
          className="flex flex-wrap justify-center gap-4 max-w-2xl animate-slide-down"
          style={{ animationDelay: '1.0s' }}
        >
          <ActionButton href="https://wa.me/5551997523087" icon={MessageCircle} text={t.whatsapp} />
          <ActionButton href="mailto:augustoph34@gmail.com" icon={Mail} text={t.email} />
          <ActionButton href="./public/curriculo.pdf" icon={FileText} text={t.resume} />
          <ActionButton href="https://github.com/augustohansel" icon={Github} text="GitHub" />
        </div>

      </main>

    </div>
  );
}

export default App;
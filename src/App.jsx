import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Briefcase, BookOpen, ArrowDown } from 'lucide-react';

import { CONTENT } from './data/content';
import { useMousePosition } from './hooks/useMousePosition';

const C = {
  bg: '#f7efe3',
  ink: '#1c1713',
  orange: '#f3a84f',
  olive: '#c6c76d',
  yellow: '#f2dc96',
  pink: '#ec87a4',
  blue: '#90b2dd',
};

const LINKS = {
  wa: 'https://wa.me/5551997523087',
  email: 'mailto:augustoph34@gmail.com',
  github: 'https://github.com/augustohansel',
  linkedin: 'https://www.linkedin.com/in/augusto-hansel',
};

const CARD_COLORS = [C.orange, C.olive, C.yellow, C.pink, C.blue, C.olive];
const CARD_SPANS = ['md:col-span-12', 'md:col-span-8', 'md:col-span-4', 'md:col-span-12', 'md:col-span-4', 'md:col-span-8'];
const GLYPHS = ['◇', '字', '✧', '✦', '↗︎', '✳︎'];
const CHIP_COLORS = [C.orange, C.blue, C.pink, C.olive, C.yellow, C.pink];
const DOT_COLORS = [C.orange, C.blue, C.pink, C.olive];
const SECTIONS = ['projects', 'about', 'exp', 'contact'];
const NAV_COLORS = { projects: C.pink, about: C.olive, exp: C.orange, contact: C.blue };

const HERO = {
  pt: { first: 'Augusto', last: 'hansel', left: 'DESENVOLVEDOR', right: 'FULL STACK', hi: ['Oi,', 'eu sou'], name: 'Augusto' },
  en: { first: 'Augusto', last: 'hansel', left: 'FULL STACK', right: 'DEVELOPER', hi: ['Hi,', "I'm"], name: 'Augusto' },
};
const LABELS = {
  pt: { projects: 'Projetos', about: 'Sobre', exp: 'Experiência', contact: 'Contato', edu: 'Formação' },
  en: { projects: 'Projects', about: 'About', exp: 'Experience', contact: 'Contact', edu: 'Education' },
};

/* ---------- motion helpers ---------- */
const ease = [0.22, 1, 0.36, 1];
const spring = { type: 'spring', stiffness: 320, damping: 24 };

const Reveal = ({ children, delay = 0, y = 28, className, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, ease, delay }}
  >
    {children}
  </motion.div>
);

const Mask = ({ children, delay = 0 }) => (
  <span className="inline-block overflow-hidden px-[0.1em] pb-[0.14em] -mb-[0.14em] align-bottom">
    <motion.span
      className="inline-block"
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.span>
  </span>
);

/* ---------- cursor suave ---------- */
const Cursor = ({ pos }) => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 42, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => { x.set(pos.x); y.set(pos.y); }, [pos, x, y]);
  useEffect(() => {
    const over = (e) => setHover(!!e.target.closest?.('a, button'));
    document.addEventListener('mouseover', over);
    return () => document.removeEventListener('mouseover', over);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] w-4 h-4 -ml-2 -mt-2 rounded-full"
      style={{ x: sx, y: sy, background: '#0f1020' }}
      animate={{ scale: hover ? 2.8 : 1, opacity: hover ? 0.35 : 1 }}
      transition={{ duration: 0.25, ease }}
    />
  );
};

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left" style={{ scaleX, background: C.orange }} />;
};

/* ---------- nav ---------- */
const Nav = ({ lang, setLang, active, onNavigate }) => {
  const L = LABELS[lang];
  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none px-2">
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.7 }}
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-1.5 shadow-lg shadow-black/10 max-w-full"
      >
        <a href="#top" className="flex items-center gap-2 pl-1 pr-3 text-sm font-bold">
          <motion.span
            whileHover={{ rotate: 90 }}
            transition={spring}
            className="grid place-items-center w-7 h-7 rounded-lg text-xs"
            style={{ background: C.orange }}
          >
            ✳︎
          </motion.span>
          <span className="hidden sm:inline">Augusto</span>
        </a>
        {SECTIONS.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => onNavigate(id)} className="relative px-3 py-1.5 rounded-full text-sm font-semibold">
            {active === id && (
              <motion.span
                layoutId="navpill"
                className="absolute inset-0 rounded-full"
                animate={{ backgroundColor: NAV_COLORS[id] }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative" style={{ color: active === id ? C.ink : '#555' }}>{L[id]}</span>
          </a>
        ))}
        <div className="flex rounded-full bg-black/5 p-0.5 ml-1">
          {['pt', 'en'].map((l) => (
            <button key={l} onClick={() => setLang(l)} className="relative px-3 py-1 rounded-full text-xs font-bold uppercase">
              {lang === l && (
                <motion.span
                  layoutId="langpill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: C.ink }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative" style={{ color: lang === l ? '#fff' : '#555' }}>{l}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

const Pill = ({ href, children, style }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold"
    style={style}
    whileHover={{ y: -3, scale: 1.04 }}
    whileTap={{ scale: 0.95 }}
    transition={spring}
  >
    {children}
  </motion.a>
);

/* ---------- projetos ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
  hover: { y: -6, scale: 1.012, transition: spring },
};

const ProjectCard = ({ p, i, t }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="show"
    whileHover="hover"
    viewport={{ once: true, margin: '-60px' }}
    className={`col-span-12 ${CARD_SPANS[i % 6]} flex flex-col justify-between gap-6 rounded-[2rem] p-6 md:p-7 min-h-[230px]`}
    style={{ background: CARD_COLORS[i % 6], color: C.ink }}
  >
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{p.techs.join(' · ')}</p>
      <h3 className="f-head text-3xl md:text-4xl mt-2">{p.name}</h3>
      <p className="mt-2 max-w-xs text-sm leading-snug">{p.desc}</p>
    </div>
    <div className="flex items-end justify-between gap-3">
      <motion.span
        variants={{ hover: { rotate: 14, scale: 1.2, transition: spring } }}
        className="text-5xl leading-none f-head inline-block"
      >
        {GLYPHS[i % 6]}
      </motion.span>
      <div className="flex flex-wrap justify-end gap-2">
        {p.liveUrl && <Pill href={p.liveUrl} style={{ background: 'rgba(0,0,0,.12)' }}>{t.liveLabel} ↗︎</Pill>}
        <Pill href={p.repoUrl} style={{ background: 'rgba(0,0,0,.12)' }}>{t.repoLabel} ↗︎</Pill>
      </div>
    </div>
  </motion.div>
);

/* ---------- experiência ---------- */
const Experience = ({ t, lang }) => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);

  const work = t.experience.map((e) => ({ title: e.role, sub: e.org, period: e.period, bullets: e.bullets, tags: e.tags }));
  const edu = t.education.map((e) => {
    const [title, sub] = e.name.split(' · ');
    return { title, sub, period: e.period, bullets: [], tags: [] };
  });
  const items = tab === 0 ? work : edu;
  const pick = (n) => { setTab(n); setOpen(0); };

  return (
    <section id="exp" className="max-w-5xl mx-auto px-5 py-24">
      <div className="flex items-end justify-between mb-5">
        <Reveal><h2 className="f-head text-5xl md:text-6xl">{LABELS[lang].exp}</h2></Reveal>
        <div className="flex gap-2">
          {[Briefcase, BookOpen].map((Icon, n) => (
            <motion.button
              key={n}
              onClick={() => pick(n)}
              aria-label={n === 0 ? LABELS[lang].exp : LABELS[lang].edu}
              className="relative grid place-items-center w-12 h-10 rounded-full"
              style={{ background: '#f0dfc2' }}
              whileTap={{ scale: 0.9 }}
            >
              {tab === n && (
                <motion.span
                  layoutId="tabpill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: C.orange }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative" />
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        className="border-t origin-left"
        style={{ borderColor: '#d9ccb6' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease }}
        >
          {items.map((it, i) => {
            const isOpen = open === i;
            const expandable = it.bullets.length > 0;
            return (
              <motion.div
                key={tab + it.title + it.sub}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: i * 0.07 }}
                className="grid md:grid-cols-[170px_1fr] gap-x-6 py-6 border-b"
                style={{ borderColor: '#e6dac6' }}
              >
                <p className="text-sm font-bold md:pt-1" style={{ color: DOT_COLORS[i % DOT_COLORS.length] }}>{it.period}</p>
                <div>
                  <button
                    onClick={() => expandable && setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex gap-4">
                      <motion.span
                        className="mt-2 w-3 h-3 rounded-full shrink-0"
                        style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                        animate={{ scale: isOpen ? 1.5 : 1 }}
                        transition={spring}
                      />
                      <div>
                        <h3 className="text-lg font-bold">{it.title}</h3>
                        <p className="text-sm text-black/55">{it.sub}</p>
                      </div>
                    </div>
                    {expandable && (
                      <motion.span
                        className="text-2xl leading-none"
                        style={{ color: C.orange }}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={spring}
                      >
                        +
                      </motion.span>
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pl-7">
                          <ul className="space-y-3 max-w-xl text-[15px]">
                            {it.bullets.map((b, bi) => (
                              <motion.li
                                key={b}
                                className="flex gap-3"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease, delay: 0.1 + bi * 0.06 }}
                              >
                                <span style={{ color: C.orange }}>→</span>
                                {b}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-5">
                            {it.tags.map((tag) => (
                              <span key={tag} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: '#f0dfc2' }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <Reveal>
        <motion.a
          href={t.cvLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 rounded-full px-6 py-3 text-sm font-bold"
          style={{ background: C.ink, color: '#fff' }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          {t.cv} ↓︎
        </motion.a>
      </Reveal>
    </section>
  );
};

/* ---------- app ---------- */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const pop = { hidden: { opacity: 0, scale: 0.7, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } } };

export default function App() {
  const [lang, setLang] = useState('pt');
  const [active, setActive] = useState('projects');
  const mousePos = useMousePosition();
  const t = CONTENT[lang];
  const h = HERO[lang];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -90]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  const lock = useRef(false);
  const lockTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (lock.current) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let current = SECTIONS[0];
      if (nearBottom) {
        current = 'contact';
      } else {
        SECTIONS.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
        });
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ao clicar no menu, marca a seção na hora e ignora o scroll durante a rolagem suave
  const handleNavigate = (id) => {
    setActive(id);
    lock.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lock.current = false;
      window.dispatchEvent(new Event('scroll'));
    }, 1000);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen cursor-none [&_*]:cursor-none" style={{ background: C.bg, color: C.ink }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Instrument+Serif:ital@1&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
          html{scroll-behavior:smooth}
          body{margin:0;background:${C.bg}}
          .f-head{font-family:'Inter Tight',system-ui,sans-serif;font-weight:800;letter-spacing:-.04em;line-height:1}
          .f-serif{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
          .f-body{font-family:'Hanken Grotesk',system-ui,sans-serif}
          @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
        `}</style>

        <Cursor pos={mousePos} />
        <ScrollBar />
        <Nav lang={lang} setLang={setLang} active={active} onNavigate={handleNavigate} />

        <main className="f-body">
          {/* hero */}
          <section className="relative min-h-screen grid place-items-center px-5">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-fit">
              <h1 className="flex items-center gap-[0.12em] text-[clamp(2.6rem,10vw,7.5rem)]">
                <Mask delay={0.1}><span className="f-head">{h.first}</span></Mask>
                <motion.span
                  className="text-[0.55em] inline-block shrink-0 mx-[0.12em] leading-none"
                  style={{ color: C.orange }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.7 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
                  >
                    ✦︎
                  </motion.span>
                </motion.span>
                <Mask delay={0.3}><span className="f-serif">{h.last}</span></Mask>
              </h1>
              <motion.div
                className="flex justify-between mt-3 text-sm font-bold tracking-[0.18em]"
                style={{ color: C.blue }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 1 }}
              >
                <span>{h.left}</span>
                <span>{h.right}</span>
              </motion.div>
            </motion.div>

            <motion.a
              href="#projects"
              aria-label={LABELS[lang].projects}
              className="absolute bottom-12 grid place-items-center w-[60px] h-[60px] rounded-full"
              style={{ background: C.olive }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ ...spring, delay: 1.4 }}
            >
              <motion.span
                className="grid place-items-center"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
              >
                <ArrowDown size={20} />
              </motion.span>
            </motion.a>
          </section>

          {/* projetos */}
          <section id="projects" className="max-w-5xl mx-auto px-5 pt-28 pb-24">
            <Reveal><h2 className="f-head text-5xl md:text-6xl mb-10">{LABELS[lang].projects}</h2></Reveal>
            <div className="grid grid-cols-12 gap-4">
              {t.projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} t={t} />)}
            </div>
            <Reveal>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 text-sm font-semibold underline underline-offset-4">
                + {t.moreOnGithub}
              </a>
            </Reveal>
          </section>

          {/* sobre */}
          <section id="about" className="max-w-6xl mx-auto px-3 md:px-5 py-16">
            <motion.div
              className="grid md:grid-cols-2 gap-10 rounded-[2.5rem] p-8 md:p-14"
              style={{ background: C.ink }}
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease }}
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <motion.span
                    className="grid place-items-center w-24 h-24 rounded-full text-3xl shrink-0"
                    style={{ background: C.yellow, color: '#8a7a50' }}
                    whileHover={{ rotate: 180, scale: 1.08 }}
                    transition={spring}
                  >
                    ✦︎
                  </motion.span>
                  <h2 className="f-head text-3xl text-white">
                    {h.hi[0]}<br />{h.hi[1]} <span style={{ color: C.pink }}>{h.name}</span>
                  </h2>
                </div>
                <motion.div
                  className="flex flex-wrap gap-2.5"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {t.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      variants={pop}
                      whileHover={{ y: -3, scale: 1.06 }}
                      className="rounded-full px-3.5 py-1.5 text-xs font-semibold"
                      style={{ background: CHIP_COLORS[i % 6], color: C.ink }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: '#d9d0c2' }}>
                {t.about.map((p, i) => (
                  <Reveal key={p} delay={0.15 + i * 0.12} y={20}><p>{p}</p></Reveal>
                ))}
              </div>
            </motion.div>
          </section>

          <Experience t={t} lang={lang} />

          {/* contato */}
          <section id="contact" className="max-w-5xl mx-auto px-5 pt-10 pb-24">
            <Reveal><h2 className="f-head text-4xl md:text-6xl mb-8">{t.contactTitle} :)</h2></Reveal>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                [LINKS.linkedin, 'LinkedIn', C.blue],
                [LINKS.email, t.email, C.pink],
                [LINKS.wa, t.wa, C.olive],
                [LINKS.github, 'GitHub', C.orange],
              ].map(([href, label, bg]) => (
                <motion.div key={href} variants={pop}>
                  <Pill href={href} style={{ background: bg, padding: '12px 22px', fontSize: 14 }}>{label} ↗︎</Pill>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <Reveal y={10}>
            <footer className="px-5 pb-10 text-center text-xs text-black/50">
              © 2026 Augusto Preuss Hansel · {t.footer}
            </footer>
          </Reveal>
        </main>
      </div>
    </MotionConfig>
  );
}
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <Reveal className={`mb-8 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan neon-eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

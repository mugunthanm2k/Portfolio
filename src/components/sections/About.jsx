import { Check } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import ProfilePhoto from '../common/ProfilePhoto';
import { about, site } from '../../data/site';
import officePhoto from '../../assets/profile-office.png';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading
        eyebrow="About me"
        title={<span id="about-title">Building real-world software, end to end.</span>}
      />

      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:gap-20">
        <Reveal className="space-y-4 lg:sticky lg:top-24">
          <div className="glass relative overflow-hidden rounded-3xl p-2">
            <ProfilePhoto
              src={officePhoto}
              alt={`${site.name} at his desk with a laptop`}
              className="aspect-square w-full rounded-[1.25rem]"
              position="center 25%"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink px-4 py-3 text-sm backdrop-blur">
              <p className="font-display font-semibold">{site.name}</p>
              <p className="text-muted">
                {site.title} · {site.location}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ['Since', '2023'],
              ['Role', 'Senior Developer'],
              ['Based in', site.location],
            ].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl px-3 py-4">
                <dt className="text-[11px] uppercase tracking-widest text-cyan">{k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">{about.intro}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan">Technical interests</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {about.interests.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="shrink-0 text-electric" /> {i}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan">Development philosophy</h3>
            <blockquote className="glass rounded-2xl border-l-4 border-l-violet p-5 text-muted">
              {about.philosophy}
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan">Career journey</h3>
            <ol className="relative space-y-4 pl-8">
              <span className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-electric via-violet to-cyan" aria-hidden="true" />
              {about.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-ink ${
                      t.current ? 'bg-gradient-to-br from-cyan to-electric' : 'bg-gradient-to-br from-electric to-violet'
                    }`}
                  >
                    {t.current && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-40" />}
                    <span className="relative h-2 w-2 rounded-full bg-white" />
                  </span>
                  <div className={`glass rounded-2xl p-4 transition hover:-translate-y-0.5 ${t.current ? 'border-cyan/50' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-cyan">{t.period}</span>
                      {t.current && (
                        <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan">Now</span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-lg font-semibold">{t.title}</p>
                    <p className="mt-1 text-sm text-muted">{t.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

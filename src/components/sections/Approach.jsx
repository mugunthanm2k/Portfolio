import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { approach } from '../../data/workflow';

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section">
      <SectionHeading
        eyebrow="Why my approach"
        title={<span id="approach-title">Engineering with the whole picture in mind.</span>}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {approach.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal as="li" key={a.title} delay={(i % 5) * 0.05}>
              <div className="glass h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:border-violet/60">
                <Icon size={22} className="neon-icon text-violet" />
                <h3 className="mt-3 text-sm font-semibold">{a.title}</h3>
                <p className="mt-1 text-xs text-muted">{a.text}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

import { ExternalLink, Github, Info } from 'lucide-react';
import ProjectArt from './ProjectArt';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1.5 hover:border-electric/60">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-electric/25 via-violet/20 to-cyan/20">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={`${project.title} thumbnail`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <ProjectArt category={project.category} className="h-full w-full transition duration-500 group-hover:scale-105" />
        )}
        {project.sample && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
            Sample demo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-cyan">{project.category}</p>
        <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full bg-line px-2.5 py-0.5 text-[11px] text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => onOpen(project)} className="btn-primary !px-4 !py-2 text-xs">
            <Info size={14} /> Project Details
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

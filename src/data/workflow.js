import {
  ClipboardList, Search, PenTool, Network, Monitor, Server, Database, Plug,
  TestTube2, ShieldCheck, Cloud, LifeBuoy, Gauge, Layers, Code2, GitBranch, Lock, Rocket,
} from 'lucide-react';

export const workflow = [
  { n: '01', title: 'Requirement Analysis', icon: ClipboardList, text: 'Understand the goal, users and constraints before writing code.' },
  { n: '02', title: 'Research & Planning', icon: Search, text: 'Choose the stack, scope the work and plan milestones.' },
  { n: '03', title: 'UI/UX Design', icon: PenTool, text: 'Wireframes and a consistent design system for every screen.' },
  { n: '04', title: 'System Architecture', icon: Network, text: 'Define services, data flow and how the parts connect.' },
  { n: '05', title: 'Frontend Development', icon: Monitor, text: 'Responsive, accessible interfaces with reusable components.' },
  { n: '06', title: 'Backend Development', icon: Server, text: 'Business logic and secure services behind clean APIs.' },
  { n: '07', title: 'Database Integration', icon: Database, text: 'Well-designed schemas and efficient data access.' },
  { n: '08', title: 'API Integration', icon: Plug, text: 'Connect frontend, backend and third-party services.' },
  { n: '09', title: 'Testing & Debugging', icon: TestTube2, text: 'Verify behaviour, fix defects and harden edge cases.' },
  { n: '10', title: 'Security & Optimization', icon: ShieldCheck, text: 'Validate input, protect data and tune performance.' },
  { n: '11', title: 'Deployment & Hosting', icon: Cloud, text: 'Linux, Nginx, PM2, domains and SSL for production.' },
  { n: '12', title: 'Maintenance & Support', icon: LifeBuoy, text: 'Monitor, update and keep improving after launch.' },
];

export const approach = [
  { icon: GitBranch, title: 'Complete lifecycle understanding', text: 'From requirement to maintenance, one person who understands every stage.' },
  { icon: Rocket, title: 'Modern technology selection', text: 'The right tool for the job, not the trendiest one.' },
  { icon: Layers, title: 'Scalable architecture', text: 'Layered, modular structure that grows without rewrites.' },
  { icon: Code2, title: 'Clean, maintainable code', text: 'Readable, reusable code that others can pick up.' },
  { icon: Monitor, title: 'Responsive UI/UX', text: 'Interfaces that feel right on desktop, tablet and phone.' },
  { icon: Database, title: 'Database-driven applications', text: 'Structured data models designed before screens.' },
  { icon: Plug, title: 'API-first development', text: 'Clear contracts so web and mobile share one backend.' },
  { icon: Lock, title: 'Security-conscious implementation', text: 'Validation, authentication and secrets kept server-side.' },
  { icon: Cloud, title: 'Deployment knowledge', text: 'Comfortable taking an app live on a server and domain.' },
  { icon: Gauge, title: 'Performance optimization', text: 'Lazy loading, lean bundles and measured improvements.' },
];

import { Monitor, Layers, Coffee, Terminal, Smartphone, Database, Cloud } from 'lucide-react';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Monitor,
    color: '#3b82f6',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vite', 'Responsive Design'],
  },
  {
    id: 'mern',
    title: 'MERN Stack',
    icon: Layers,
    color: '#22d3ee',
    items: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API'],
  },
  {
    id: 'java',
    title: 'Java Full Stack',
    icon: Coffee,
    color: '#f59e0b',
    items: ['Java', 'Spring Boot', 'JDBC', 'Hibernate', 'JSP', 'MySQL'],
  },
  {
    id: 'python',
    title: 'Python Development',
    icon: Terminal,
    color: '#10b981',
    items: ['Python', 'Django', 'Flask', 'REST API', 'Backend Development'],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: Smartphone,
    color: '#ec4899',
    items: ['Mobile Application Development', 'Cross-platform Development', 'API Integration', 'Responsive Mobile UI'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    color: '#8b5cf6',
    items: ['MySQL', 'MongoDB', 'Database Architecture', 'Database Optimization'],
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    icon: Cloud,
    color: '#60a5fa',
    items: ['Linux', 'VPS', 'Cloud Hosting', 'cPanel', 'PM2', 'Nginx', 'Domain Configuration', 'SSL', 'Application Deployment'],
  },
];

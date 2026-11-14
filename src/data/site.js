// ──────────────────────────────────────────────────────────
//  EDIT THIS FILE to customise your personal details.
//  Anything left as a placeholder is clearly marked.
// ──────────────────────────────────────────────────────────

export const site = {
  name: 'Mugunthan',
  initials: 'M', // add a surname initial here later, e.g. 'MK'
  logo: `${import.meta.env.BASE_URL}logo.png`,   // file: public/logo.png ('' kudutha M logo varum)
  logoShowName: true,  // logo-vula peyar irundha false podunga
  title: 'Full Stack Software Developer',
  location: 'India',
  email: 'mugunthanm2k@gmail.com',
  phone: '+91 82486 13375',
  tagline: 'From Idea to Deployment – Building Digital Experiences That Matter.',
  heroStatement:
    'Engineering Powerful Digital Experiences Through Code, Creativity & Innovation.',
  heroText:
    'I design, develop and deploy modern websites, scalable web applications, mobile applications and complete digital solutions.',
  url: 'https://your-domain.com',
  year: new Date().getFullYear(),
};

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/mugunthanm2k' }, // TODO
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mugunthan-m' }, // TODO
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/918248613375' },
  { id: 'email', label: 'Email', href: `mailto:${site.email}` },
];

// Availability badge in the hero. Switch `enabled` once your employer permits it.
export const availability = {
  enabled: false,
  label: 'Open to new opportunities',
};

// Contact form: opens WhatsApp with the visitor's enquiry pre-filled (no backend needed).
// Number format: country code + number, no "+" or spaces. Set enabled:false to switch it off.
export const contactConfig = {
  enabled: true,
  whatsapp: '918248613375',
};

// "What I can build" Learn More / enquiry links are informational until enabled.
export const servicePromotion = {
  enquiryEnabled: false,
};

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'capabilities', label: 'Build' },
  { id: 'projects', label: 'Projects' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  intro:
    'I am a software developer who enjoys turning ideas into real-world software, from the first wireframe to a deployed, running product. I like understanding the whole picture: the interface people touch, the APIs behind it, the database that keeps it honest, and the server it lives on.',
  philosophy:
    'Build it simply, build it clean, and make it easy to change. Good software is understandable, secure by habit and ready for production on day one.',
  interests: [
    'Full Stack Development',
    'Problem Solving',
    'Software Architecture',
    'Database Design',
    'API Development',
    'Application Development',
    'Cloud and Server Deployment',
    'Continuous Learning',
  ],
  // Fill in real milestones. Nothing here is invented.
  timeline: [
    { period: '2023', title: 'Began my software development journey', note: 'Started building and learning across the web development stack.' },
    { period: '2024', title: 'Full Stack Developer', note: 'Worked across frontend, backend, databases and deployment.' },
    { period: 'Present', title: 'Senior Software Developer', note: 'Designing, building and deploying complete digital products.', current: true },
  ],
};

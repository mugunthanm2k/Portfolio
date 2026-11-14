import { ArrowLeft } from 'lucide-react';
import Logo from '../components/common/Logo';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <Logo size={64} />
      <p className="mt-8 font-mono text-sm text-cyan">Error 404</p>
      <h1 className="mt-2 text-5xl font-bold sm:text-6xl">
        <span className="gradient-text">Page not found</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for does not exist or has moved. Let's get you back on track.
      </p>
      <a href="/" className="btn-primary mt-8">
        <ArrowLeft size={16} /> Back to home
      </a>
    </main>
  );
}

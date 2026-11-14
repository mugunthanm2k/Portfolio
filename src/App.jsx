import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Lightweight path check: only "/" (and index.html) is a valid route.
// Host config (see README) must serve index.html for "/" and let unknown paths reach this component.
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const valid = path === '/' || path === '/index.html';
  return valid ? <Home /> : <NotFound />;
}

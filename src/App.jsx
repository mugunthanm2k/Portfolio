
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
console.log("PAth", basePath);
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  const valid =
    path === basePath ||
    path === `${basePath}/index.html`;

  return valid ? <Home /> : <NotFound />;
}

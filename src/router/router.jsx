import { createContext, useContext, useEffect, useState, useCallback } from 'react';

// State-based hash router. Routes look like:
// /  /catalog  /product/:id  /about  /wholesale  /contacts  /inquiry

const RouterContext = createContext(null);

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, queryString] = raw.split('?');
  const params = new URLSearchParams(queryString || '');
  const segments = path.split('/').filter(Boolean);
  return { path: path || '/', segments, params };
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    if (!window.location.hash) window.location.hash = '#/';
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to) => {
    const target = to.startsWith('#') ? to : `#${to}`;
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  }, []);

  const buildPath = useCallback((path, params = {}) => {
    const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
    const qs = entries.length ? `?${new URLSearchParams(entries).toString()}` : '';
    return `${path}${qs}`;
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate, buildPath }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

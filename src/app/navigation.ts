const NAVIGATION_EVENT = 'visual-english-navigation';

export const getLocationSnapshot = () => window.location.href;
export const getServerLocationSnapshot = () => 'http://localhost/';

export function subscribeNavigation(listener: () => void) {
  window.addEventListener('popstate', listener);
  window.addEventListener(NAVIGATION_EVENT, listener);
  return () => { window.removeEventListener('popstate', listener); window.removeEventListener(NAVIGATION_EVENT, listener); };
}

export function navigate(path: string, replace = false) {
  const destination = new URL(path, window.location.href);
  if (destination.href === window.location.href) return;
  if (replace) window.history.replaceState(null, '', destination.href);
  else window.history.pushState(null, '', destination.href);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

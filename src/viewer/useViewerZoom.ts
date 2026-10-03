import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type FitMode = 'page' | 'width' | 'manual';
export const PAGE_WIDTH = 210 * 96 / 25.4;
export const PAGE_HEIGHT = 297 * 96 / 25.4;
const STEPS = [.5, .6, .75, .9, 1, 1.1, 1.25, 1.5, 1.75, 2];

export function useViewerZoom() {
  const viewport = useRef<HTMLDivElement>(null);
  const lastWheel = useRef(0);
  const readingCenter = useRef<{ x: number; y: number } | null>(null);
  const [fitMode, setFitMode] = useState<FitMode>(() => matchMedia('(max-width: 760px)').matches ? 'width' : 'page');
  const [manualZoom, setManualZoom] = useState(1);
  const [available, setAvailable] = useState({ width: PAGE_WIDTH, height: PAGE_HEIGHT });
  useEffect(() => {
    const host = viewport.current;
    if (!host) return;
    const measure = () => {
      const canvas = host.firstElementChild;
      if (!canvas) return;
      const padding = getComputedStyle(canvas);
      setAvailable({
        width: Math.max(1, host.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight)),
        height: Math.max(1, host.clientHeight - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom)),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    measure();
    return () => observer.disconnect();
  }, []);
  const zoom = fitMode === 'manual' ? manualZoom : Math.min(2, available.width / PAGE_WIDTH, fitMode === 'page' ? available.height / PAGE_HEIGHT : Infinity);
  const setZoom = useCallback((value: number) => {
    const host = viewport.current;
    const frame = host?.querySelector('.viewer-card-frame');
    if (host && frame) {
      const area = host.getBoundingClientRect();
      const card = frame.getBoundingClientRect();
      readingCenter.current = {
        x: Math.max(0, Math.min(PAGE_WIDTH, (area.left + host.clientWidth / 2 - card.left) / zoom)),
        y: Math.max(0, Math.min(PAGE_HEIGHT, (area.top + host.clientHeight / 2 - card.top) / zoom)),
      };
    }
    setManualZoom(Math.max(.5, Math.min(2, value)));
    setFitMode('manual');
  }, [zoom]);
  useLayoutEffect(() => {
    const center = readingCenter.current;
    readingCenter.current = null;
    const host = viewport.current;
    const frame = host?.querySelector('.viewer-card-frame');
    if (!center || !host || !frame) return;
    const area = host.getBoundingClientRect();
    const card = frame.getBoundingClientRect();
    host.scrollLeft += card.left + center.x * zoom - area.left - host.clientWidth / 2;
    host.scrollTop += card.top + center.y * zoom - area.top - host.clientHeight / 2;
  }, [zoom]);
  const step = useCallback((direction: number) => {
    if ((direction < 0 && zoom <= .5) || (direction > 0 && zoom >= 2)) return;
    const next = direction > 0 ? STEPS.find((value) => value > zoom + .001) ?? 2 : [...STEPS].reverse().find((value) => value < zoom - .001) ?? .5;
    setZoom(next);
  }, [zoom, setZoom]);
  const fit = useCallback((mode: FitMode) => {
    readingCenter.current = null;
    viewport.current?.scrollTo({ top: 0, left: 0 });
    if (mode === 'manual') setManualZoom(1);
    setFitMode(mode);
  }, []);
  // Freeze the exact visual scale on focus changes, including narrow fit-width scales.
  const preserveZoom = () => { setManualZoom(zoom); setFitMode('manual'); };
  useEffect(() => {
    const host = viewport.current;
    if (!host) return;
    const wheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      if (event.deltaY && performance.now() - lastWheel.current > 100) {
        lastWheel.current = performance.now();
        step(event.deltaY < 0 ? 1 : -1);
      }
    };
    host.addEventListener('wheel', wheel, { passive: false });
    return () => host.removeEventListener('wheel', wheel);
  }, [step]);
  return { viewport, zoom, fitMode, setZoom, step, fit, preserveZoom };
}

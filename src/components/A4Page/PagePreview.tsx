import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

// Resize only the outer preview; the printed page always keeps its physical size.
export function PagePreview({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    const wrapper = frame.current;
    const canvas = page.current;
    if (!container || !wrapper || !canvas) return;
    const resize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const scale = Math.min(1, container.clientWidth / width, container.clientHeight / height);
      canvas.style.transform = `scale(${scale})`;
      wrapper.style.width = `${width * scale}px`;
      wrapper.style.height = `${height * scale}px`;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, []);

  return <div className="preview-host" ref={host}><div className="preview-frame" ref={frame}><div className="preview-page" ref={page}>{children}</div></div></div>;
}

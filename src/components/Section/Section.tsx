import type { ReactNode } from 'react';

export function Section({ title, label, children, className = '' }: { title: string; label?: string; children: ReactNode; className?: string }) {
  return <section className={`section ${className}`}>
    <div className="section__heading">{label && <span className="section__label">{label}</span>}<h2>{title}</h2></div>
    {children}
  </section>;
}

import type { ReactNode } from 'react';
import './platform.css';

export function PlatformLayout({ children }: { children: ReactNode }) {
  return <div className="platform">
    <header className="platform-header"><a className="platform-brand" href="/" aria-label="Visual English — главная"><span className="platform-brand__mark" aria-hidden="true">VE</span>Visual English</a><nav aria-label="Платформа"><a href="/#courses">Курсы</a><a href="/toolkit">Больше практики</a></nav></header>
    <main className="platform-main">{children}</main>
    <footer className="platform-footer"><span>Visual English</span><span>Learn through meaning, patterns and practice.</span></footer>
  </div>;
}

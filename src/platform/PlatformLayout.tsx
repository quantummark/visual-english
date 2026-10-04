import type { ReactNode } from 'react';
import './platform.css';

export function PlatformLayout({ children }: { children: ReactNode }) {
  return <div className="platform">
    <header className="platform-header"><a className="platform-brand" href="/" aria-label="Visual English Lab — Home"><img className="platform-brand__logo" src="/brand/logo/visual-english-lab-header.svg" alt="Visual English Lab" /></a><nav aria-label="Платформа"><a href="/#courses">Курсы</a><a href="/toolkit">Больше практики</a></nav></header>
    <main className="platform-main">{children}</main>
    <footer className="platform-footer"><span>Visual English Lab</span><span>Learn through meaning, patterns and practice.</span></footer>
  </div>;
}

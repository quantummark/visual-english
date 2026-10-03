import type { ReactNode } from 'react';
import type { Accent } from '../../types/course';

export function MainIdeaBox({ children, label = 'ГЛАВНАЯ ИДЕЯ', accent }: { children: ReactNode; label?: string; accent?: Accent }) {
  return <aside className="main-idea-box" data-accent={accent}><span className="label">{label}</span><div>{children}</div></aside>;
}

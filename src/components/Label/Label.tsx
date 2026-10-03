import type { ReactNode } from 'react';

export function Label({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'hint' }) {
  return <span className={`label label--${tone}`}>{children}</span>;
}

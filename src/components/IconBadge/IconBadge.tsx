import type { ReactNode } from 'react';
import type { Accent } from '../../types/course';

export function IconBadge({ children, label, accent }: { children: ReactNode; label: string; accent?: Accent }) {
  return <span className="icon-badge" role="img" aria-label={label} data-accent={accent}>{children}</span>;
}

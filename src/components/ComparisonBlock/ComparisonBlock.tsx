import type { ReactNode } from 'react';

export function ComparisonBlock({ left, right, leftLabel = 'Вариант A', rightLabel = 'Вариант B' }: { left: ReactNode; right: ReactNode; leftLabel?: string; rightLabel?: string }) {
  return <div className="comparison-block"><div><span className="label">{leftLabel}</span>{left}</div><span className="comparison-block__arrow" aria-hidden="true">↔</span><div><span className="label">{rightLabel}</span>{right}</div></div>;
}

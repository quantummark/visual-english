export function FlowArrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return <svg className={`flow-arrow flow-arrow--${direction}`} viewBox="0 0 40 24" fill="none" aria-hidden="true"><path d="M2 12h33M27 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

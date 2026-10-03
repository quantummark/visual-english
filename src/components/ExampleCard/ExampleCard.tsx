import type { Accent } from '../../types/course';

export function ExampleCard({ english, explanation, accent }: { english: string; explanation: string; accent?: Accent }) {
  return <div className="example-card" data-accent={accent}><p className="example-card__english" lang="en">{english}</p><p className="small-note">{explanation}</p></div>;
}

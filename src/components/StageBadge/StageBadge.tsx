export function StageBadge({ stage, label = 'ЭТАП' }: { stage: number; label?: string }) {
  return <span className="stage-badge">{label} {stage}</span>;
}

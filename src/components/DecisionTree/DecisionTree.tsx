import type { ReactNode } from 'react';
import { FlowArrow } from '../FlowArrow/FlowArrow';

export interface DecisionBranch { id: string; label: string; content: ReactNode }

// One question and a small set of branches. Compose another tree inside a branch if needed.
export function DecisionTree({ question, branches }: { question: ReactNode; branches: readonly DecisionBranch[] }) {
  return <div className="decision-tree"><div className="diagram-node decision-tree__root">{question}</div><FlowArrow direction="down" />
    <ul className="decision-tree__branches">{branches.map((branch) => <li key={branch.id}><span className="label">{branch.label}</span><div className="diagram-node">{branch.content}</div></li>)}</ul>
  </div>;
}

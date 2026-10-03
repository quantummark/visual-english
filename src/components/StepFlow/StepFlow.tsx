import { Fragment } from 'react';
import { FlowArrow } from '../FlowArrow/FlowArrow';
import type { ReactNode } from 'react';

export function StepFlow({ steps, label = 'Последовательность' }: { steps: readonly ReactNode[]; label?: string }) {
  return <ol className="step-flow" aria-label={label}>{steps.map((step, index) => <Fragment key={index}>
    <li className="diagram-node"><span className="step-flow__number">{index + 1}</span>{step}</li>
    {index < steps.length - 1 && <li className="step-flow__connector" aria-hidden="true"><FlowArrow /></li>}
  </Fragment>)}</ol>;
}

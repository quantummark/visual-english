import type { ReactNode } from 'react';

export function PracticeBox({ question, options, children, answer }: { question: string; options?: readonly string[]; children?: ReactNode; answer?: ReactNode }) {
  return <div className="practice-box"><p className="practice-box__question">{question}</p>
    {options && <ol className="practice-box__options">{options.map((option, index) => <li key={`${index}-${option}`}>{option}</li>)}</ol>}
    {children}
    {answer !== undefined && <div className="practice-box__answer"><span className="label">ОТВЕТ</span>{answer}</div>}
  </div>;
}

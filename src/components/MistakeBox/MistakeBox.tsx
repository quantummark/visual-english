export function MistakeBox({ wrong, correct, explanation }: { wrong: string; correct: string; explanation?: string }) {
  return <div className="mistake-box">
    <p className="mistake-box__wrong"><span aria-label="Неверно">×</span><span lang="en">{wrong}</span></p>
    <p className="mistake-box__correct"><span aria-label="Верно">✓</span><span lang="en">{correct}</span></p>
    {explanation && <p className="small-note">{explanation}</p>}
  </div>;
}

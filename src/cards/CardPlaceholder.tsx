import { A4Page, CourseHeader, CourseFooter, Section, MainIdeaBox, ExampleCard, MistakeBox, PracticeBox, Label } from '../components';
import { getCourseCard } from '../data/courseCards';
import type { CardId } from '../types/course';

export function CardPlaceholder({ id }: { id: CardId }) {
  const card = getCourseCard(id);
  if (!card) throw new Error(`Missing course metadata: ${id}`);
  return <A4Page cardId={card.id} accent={card.accent}>
    <CourseHeader card={card} />
    <div className="page-content page-grid">
      <MainIdeaBox label="МЕСТО ДЛЯ ГЛАВНОЙ ИДЕИ">Одна карточка. Одна понятная система.</MainIdeaBox>
      <Section title="Визуальная схема" label="01" className="visual-section">
        <div className="visual-placeholder">
          <Label tone="accent">VISUAL PLACEHOLDER</Label>
          <svg className="placeholder-diagram" viewBox="0 0 420 122" fill="none" aria-hidden="true">
            <path d="M94 61h67m98 0h67" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" />
            <rect x="6" y="29" width="88" height="64" rx="13" /><rect x="161" y="9" width="98" height="104" rx="15" /><rect x="326" y="29" width="88" height="64" rx="13" />
            <path d="M31 53h38m-38 16h24m126-21h58m-58 16h40m-40 16h48m112-27h38m-38 16h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <h3>{card.visualTitle}</h3>
          <p lang="en">Main visual will be implemented here</p>
          <span className="small-note">Схема будет создана по отдельной спецификации карточки.</span>
        </div>
      </Section>
      <Section title="Примеры в контексте" label="02" className="examples-section">
        <div className="two-column"><ExampleCard english="English example" explanation="Место для примера и объяснения." /><ExampleCard english="Another example" explanation="Место для сравнения вариантов." /></div>
      </Section>
      <div className="two-column page-grid__full">
        <Section title="Типичная ошибка" label="03"><MistakeBox wrong="Incorrect example" correct="Correct example" explanation="Здесь появится пояснение ошибки." /></Section>
        <Section title="Короткая практика" label="04"><PracticeBox question="Здесь появится короткое задание."><div className="practice-placeholder" aria-hidden="true"><span /><span /></div><p className="small-note">Проверьте себя на одном примере.</p></PracticeBox></Section>
      </div>
    </div>
    <CourseFooter card={card} />
  </A4Page>;
}

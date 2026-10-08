import type { AvailableCourse } from '../courses/courseTypes';
import { coursePath } from '../courses/coursePaths';

export function CoursePrint({ course }: { course: AvailableCourse }) {
  const print = async () => {
    await document.fonts.ready;
    window.print();
  };

  return <>
    <header className="print-toolbar no-print">
      <div className="print-toolbar__title"><strong>{course.title}</strong><span>{course.cards.length} карточек · A4</span></div>
      <nav className="print-toolbar__actions" aria-label="Печать курса">
        <a className="button" href={coursePath(course)}>← К курсу</a>
        <button className="button button--primary" onClick={print}>Распечатать / сохранить PDF</button>
      </nav>
    </header>
    <main className="print-stack" data-course-slug={course.slug} aria-label={`Все карточки курса ${course.title}`}>
      {course.cards.map((card) => {
        const Card = card.component;
        return <div className="print-card" key={card.id} data-card-number={card.number} data-card-slug={card.slug}><Card /></div>;
      })}
    </main>
  </>;
}

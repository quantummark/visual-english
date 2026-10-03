import type { ComingSoonCourse } from '../courses/courseTypes';
import { PlatformLayout } from './PlatformLayout';

export function ComingSoon({ course }: { course: ComingSoonCourse }) {
  return <PlatformLayout><section className="platform-coming-soon"><span className="course-soon">Скоро</span><h1>{course.title}</h1><p>Курс ещё находится в разработке.</p><p className="platform-coming-soon__description">{course.description}</p><a className="button" href="/">← Все курсы</a></section></PlatformLayout>;
}

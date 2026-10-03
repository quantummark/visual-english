import { memo } from 'react';
import { PagePreview } from '../components/A4Page/PagePreview';
import type { CourseLesson } from '../courses/courseTypes';

export const CardThumbnail = memo(function CardThumbnail({ card }: { card: CourseLesson }) {
  const Card = card.component;
  return <div className="platform-thumbnail" aria-hidden="true" inert><PagePreview><Card /></PagePreview></div>;
});

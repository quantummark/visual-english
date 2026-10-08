import type { CourseCard } from '../../types/course';
import type { CourseLesson } from '../courseTypes';
import { b2C1Stages } from './stages';

const cardTitles = [
  { id: 1, title: 'От правильного английского к точному', shortTitle: 'Точность', slug: 'precision' },
  { id: 2, title: 'Насколько я уверен?', shortTitle: 'Уверенность', slug: 'certainty' },
  { id: 3, title: 'Как смягчать мысль', shortTitle: 'Тон', slug: 'tone' },
  { id: 4, title: 'Что именно главное?', shortTitle: 'Фокус', slug: 'focus' },
  { id: 5, title: 'Как строить сложную мысль слоями', shortTitle: 'Слои мысли', slug: 'layers' },
  { id: 6, title: 'Причина → результат → последствия', shortTitle: 'Причина и результат', slug: 'cause-result' },
  { id: 7, title: 'Как показать две стороны идеи', shortTitle: 'Две стороны', slug: 'two-sides' },
  { id: 8, title: 'Реальность и альтернативная реальность', shortTitle: 'Альтернатива', slug: 'alternative-reality' },
  { id: 9, title: 'Слова живут парами и блоками', shortTitle: 'Сочетания', slug: 'chunks' },
  { id: 10, title: 'Почему буквальный перевод звучит странно', shortTitle: 'Без перевода', slug: 'beyond-translation' },
  { id: 11, title: 'Advanced ≠ complicated', shortTitle: 'Проще и точнее', slug: 'simple-precise' },
  { id: 12, title: 'Как держать длинную мысль', shortTitle: 'Длинная мысль', slug: 'long-thought' },
  { id: 13, title: 'Как думать прямо во время разговора', shortTitle: 'Речь в процессе', slug: 'conversation' },
  { id: 14, title: 'Как понимать то, что не сказано прямо', shortTitle: 'Скрытый смысл', slug: 'implied-meaning' },
] as const;

export const b2C1Cards: readonly (CourseCard & Pick<CourseLesson, 'number' | 'stageId'>)[] = cardTitles.map((card, index) => {
  const stage = b2C1Stages.find((item) => item.cardNumbers.includes(card.id));
  if (!stage) throw new Error(`B2 → C1 card ${card.id} has no course stage`);
  return {
    ...card, number: card.id, stageId: stage.id, category: stage.title, accent: stage.accent,
    subtitle: '', visualTitle: card.shortTitle,
    previous: cardTitles[index - 1]?.id ?? null, next: cardTitles[index + 1]?.id ?? null,
  };
});

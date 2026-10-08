import { BEGINNER_B2_COURSE_ID, courseCards } from '../../data/courseCards';
import type { AvailableCourse } from '../courseTypes';
import { coursePrintPath } from '../coursePaths';
import { cardComponents } from './cardComponents';
import { beginnerB2Stages } from './stages';

// The original metadata remains the source for the unchanged A4 documents.
const cards = courseCards.map((card) => {
  const stage = beginnerB2Stages.find((item) => item.cardNumbers.includes(card.id));
  if (!stage) throw new Error(`Card ${card.id} has no course stage`);
  return { ...card, number: card.id, stageId: stage.id, component: cardComponents[card.id] };
});

export const beginnerB2Course: AvailableCourse = {
  id: BEGINNER_B2_COURSE_ID, slug: BEGINNER_B2_COURSE_ID,
  title: 'Beginner → B2', name: 'Conversational English', levelFrom: 'Beginner', levelTo: 'B2',
  description: 'Пошаговая визуальная система: от структуры предложения до живой разговорной речи.',
  status: 'available', accent: 'blue', cards, cardIds: cards.map((card) => card.id),
  stages: beginnerB2Stages, previewCardNumbers: [1, 4, 13],
  overview: {
    description: 'От базовой структуры предложения до уверенной разговорной речи.',
    introduction: 'Этот курс объясняет английский через смысл и визуальные модели, а не через зубрёжку терминов. Ты научишься собирать предложения, показывать время и намерение, соединять идеи, использовать B2-конструкции, понимать живую речь и тренировать разговорный английский.',
    principle: 'Сначала смысл → потом английская форма.',
  },
  printPath: coursePrintPath({ slug: BEGINNER_B2_COURSE_ID }),
};

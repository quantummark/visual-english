import type { AvailableCourse } from '../courseTypes';
import { coursePrintPath } from '../coursePaths';
import { b2C1Cards } from './cards';
import { b2C1CardComponents } from './cardComponents';
import { b2C1Stages } from './stages';

const cards = b2C1Cards.map((card) => ({ ...card, component: b2C1CardComponents[card.id] }));

export const b2C1Course: AvailableCourse = {
  id: 'b2-c1', slug: 'b2-c1', title: 'B2 → C1', name: 'Advanced English', levelFrom: 'B2', levelTo: 'C1',
  description: 'От правильного английского к точной, естественной и уверенной речи.',
  status: 'available', accent: 'purple', cards, cardIds: cards.map((card) => card.id),
  stages: b2C1Stages, previewCardNumbers: [1, 5, 12],
  printPath: coursePrintPath({ slug: 'b2-c1' }),
  overview: {
    description: 'Курс о том, как выражать мысли точнее, строить сложные идеи понятнее и звучать естественнее.',
    introduction: 'B2 помогает выразить мысль. C1 помогает управлять тем, как эта мысль звучит.',
    principle: 'Сначала смысл → потом английская форма.',
    outcomes: [
      'точнее показывать уверенность и отношение;',
      'мягко выражать несогласие и критику;',
      'строить сложные мысли слоями;',
      'использовать естественные сочетания слов;',
      'меньше переводить буквально;',
      'поддерживать длинную связную речь;',
      'понимать подтекст, tone и implied meaning.',
    ],
  },
};

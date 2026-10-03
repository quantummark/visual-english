import type { CourseStage } from '../courseTypes';

export const beginnerB2Stages: readonly CourseStage[] = [
  { id: 'foundation', title: 'Основа', description: 'Учимся собирать простую английскую мысль.', accent: 'blue', cardNumbers: [1, 2, 3] },
  { id: 'meaning', title: 'Выражаем смысл', description: 'Учимся показывать время, намерение, связь между идеями и детали.', accent: 'green', cardNumbers: [4, 5, 6, 7, 8, 9, 10] },
  { id: 'b2-thinking', title: 'B2-мышление', description: 'Учимся выражать альтернативы, возможности и более точные мысли.', accent: 'purple', cardNumbers: [11, 12] },
  { id: 'spoken-english', title: 'Живая речь', description: 'Учимся понимать живой английский и превращать знания в разговорный навык.', accent: 'cyan', cardNumbers: [13, 14] },
];

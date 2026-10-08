import type { CourseStage } from '../courseTypes';

export const b2C1Stages: readonly CourseStage[] = [
  { id: 'precision', title: 'Precision', supportingTitle: 'Говорим точнее', description: 'Учимся управлять уверенностью, тоном, оттенком и фокусом мысли.', accent: 'blue', cardNumbers: [1, 2, 3, 4] },
  { id: 'complex-ideas', title: 'Complex Ideas', supportingTitle: 'Строим сложную мысль понятно', description: 'Учимся соединять причины, последствия, контрасты и альтернативные версии реальности.', accent: 'purple', cardNumbers: [5, 6, 7, 8] },
  { id: 'natural-english', title: 'Natural English', supportingTitle: 'Говорим естественнее', description: 'Учимся использовать естественные сочетания и передавать смысл без буквального перевода.', accent: 'teal', cardNumbers: [9, 10, 11] },
  { id: 'discourse-conversation', title: 'Discourse & Conversation', supportingTitle: 'Управляем речью', description: 'Учимся удерживать длинную мысль, перестраивать её во время разговора и понимать скрытый смысл.', accent: 'cyan', cardNumbers: [12, 13, 14] },
];

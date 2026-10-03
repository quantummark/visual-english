import type { CourseCard } from '../types/course';

type CourseCardDefinition = Omit<CourseCard, 'subtitle'> & { subtitle?: string };

const cardDefinitions: readonly CourseCardDefinition[] = [
  { id: 1, slug: 'master-map', title: 'Английский как система', shortTitle: 'Карта английского', subtitle: 'От простого предложения до уверенной разговорной речи.', category: 'Основа', accent: 'blue', visualTitle: 'Карта английского языка', previous: null, next: 2 },
  { id: 2, slug: 'sentence-structure', title: 'Как собрать английское предложение', shortTitle: 'Структура предложения', subtitle: 'Начни с простого каркаса и добавляй детали.', category: 'Основа', accent: 'blue', visualTitle: 'Конструктор предложения', previous: 1, next: 3 },
  { id: 3, slug: 'questions-negatives', title: 'Как задавать вопросы и говорить «не»', shortTitle: 'Вопросы и отрицания', subtitle: 'Сначала найди слово, которое управляет предложением.', category: 'Основа', accent: 'blue', visualTitle: 'Схема вопросов и отрицаний', previous: 2, next: 4 },
  { id: 4, slug: 'time-logic', title: 'Как английский показывает время', shortTitle: 'Логика времени', subtitle: 'Сначала реши: когда это происходит и что важнее — факт или процесс.', category: 'Время', accent: 'orange', visualTitle: 'Визуальная линия времени', previous: 3, next: 5 },
  { id: 5, slug: 'result-duration', title: 'Результат и длительность', shortTitle: 'Результат и процесс', subtitle: 'Иногда важно не когда произошло действие, а какой результат есть сейчас или как долго оно длится.', category: 'Время', accent: 'orange', visualTitle: 'Сравнение результата и длительности', previous: 4, next: 6 },
  { id: 6, slug: 'ability-want-need-advice', title: 'Могу / хочу / нужно / стоит', shortTitle: 'Возможности и намерения', subtitle: 'Выбирай конструкцию по тому, что именно ты хочешь выразить.', category: 'Мысли и намерения', accent: 'green', visualTitle: 'Карта возможностей и намерений', previous: 5, next: 7 },
  { id: 7, slug: 'connecting-ideas', title: 'Как соединять мысли', shortTitle: 'Связи между мыслями', subtitle: 'Связная речь строится не из сложных слов, а из понятной связи между идеями.', category: 'Мысли и намерения', accent: 'green', visualTitle: 'Схема связей между идеями', previous: 6, next: 8 },
  { id: 8, slug: 'prepositions-chunks', title: 'Предлоги и готовые фразы', shortTitle: 'Предлоги и фразы', subtitle: 'Не учи маленькое слово отдельно. Учи отношение или всю фразу целиком.', category: 'Готовые фразы', accent: 'teal', visualTitle: 'Карта предлогов и устойчивых фраз', previous: 7, next: 9 },
  { id: 9, slug: 'articles', title: 'Как выбрать a / an / the / ничего', shortTitle: 'Артикли', subtitle: 'Сначала реши: один предмет, конкретный предмет или говорим вообще.', category: 'Точность смысла', accent: 'purple', visualTitle: 'Дерево выбора артикля', previous: 8, next: 10 },
  { id: 10, slug: 'quantity', title: 'Как говорить о количестве', shortTitle: 'Количество', subtitle: 'Сначала реши: можно ли посчитать это по отдельности.', category: 'Точность смысла', accent: 'purple', visualTitle: 'Визуальная шкала количества', previous: 9, next: 11 },
  { id: 11, slug: 'reality-conditionals', title: 'Реальность, возможность и «если бы»', shortTitle: 'Условия и возможности', subtitle: 'Сначала реши: это реально может произойти, мы представляем другую ситуацию сейчас или другое прошлое.', category: 'Точность смысла', accent: 'purple', visualTitle: 'Карта реальности и условий', previous: 10, next: 12 },
  { id: 12, slug: 'complex-meaning', title: 'Как выражать более сложные мысли', shortTitle: 'Сложные мысли', subtitle: 'Для разных смыслов есть разные простые шаблоны.', category: 'Точность смысла', accent: 'purple', visualTitle: 'Конструктор сложного смысла', previous: 11, next: 13 },
  { id: 13, slug: 'real-spoken-english', title: 'Почему живой английский звучит иначе', shortTitle: 'Живой английский', subtitle: 'В речи слова сокращаются, ослабевают и соединяются в один поток.', category: 'Понимание и практика', accent: 'cyan', visualTitle: 'Карта звучания живой речи', previous: 12, next: 14 },
  { id: 14, slug: 'practice-system', title: 'Как научиться понимать и говорить', shortTitle: 'Система практики', subtitle: 'Не учи английский только глазами. Используй полный цикл: услышал → понял → повторил → сказал сам.', category: 'Понимание и практика', accent: 'cyan', visualTitle: 'Система регулярной практики', previous: 13, next: null },
];

export const courseCards: readonly CourseCard[] = cardDefinitions.map((card) => ({
  ...card,
  subtitle: card.subtitle ?? 'Короткое объяснение темы появится здесь после реализации карточки.',
}));

export const totalCards = courseCards.length;
export const BEGINNER_B2_COURSE_ID = 'beginner-b2';
export const courseCardIds: readonly number[] = courseCards.map((card) => card.id);
export const formatCardNumber = (id: number) => String(id).padStart(2, '0');
export const cardPath = (id: number) => `/cards/${formatCardNumber(id)}`;
export const getCourseCard = (id: number) => courseCards.find((card) => card.id === id);

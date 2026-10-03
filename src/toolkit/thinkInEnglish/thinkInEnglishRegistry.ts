import type { ThinkInEnglishCategory, ThinkInEnglishResource } from './thinkInEnglishTypes';

export const thinkInEnglishCategories: readonly { id: ThinkInEnglishCategory; label: string }[] = [
  { id: 'building-thoughts', label: 'Строим мысль' },
  { id: 'expressing-meaning', label: 'Передаём смысл' },
  { id: 'spoken-english', label: 'Понимаем живую речь' },
];

export const thinkInEnglishResources: readonly ThinkInEnglishResource[] = [
  { id: 'thinking-in-blocks', slug: 'thinking-in-blocks', title: 'Английский думает блоками', description: 'Почему английскую мысль удобнее собирать по частям, а не переводить целое предложение.', category: 'building-thoughts', beginnerFriendly: true, status: 'available', featured: true, sample: { model: ['КТО', 'ДЕЙСТВИЕ', 'ОБЪЕКТ', 'ДЕТАЛИ'], examples: ['I → need → more time → today.', 'We → meet → our friends → on Sundays.'] } },
  { id: 'why-english-needs-a-subject', slug: 'why-english-needs-a-subject', title: 'Почему английскому нужен «кто»', description: 'Почему в английском почти всегда нужен явный каркас: кто или что находится в центре мысли.', category: 'building-thoughts', beginnerFriendly: true, status: 'available', sample: { model: ['КТО / ЧТО', 'ЧТО ПРОИСХОДИТ'], examples: ['It is cold.', 'I need help.'] } },
  { id: 'do-not-translate-the-whole-sentence', slug: 'do-not-translate-the-whole-sentence', title: 'Не переводи предложение целиком', description: 'Как перестать сначала строить русскую фразу и начать собирать английскую мысль сразу.', category: 'building-thoughts', beginnerFriendly: true, status: 'available', sample: { model: ['СМЫСЛ', 'БЛОКИ', 'АНГЛИЙСКАЯ ФРАЗА'], examples: ['I want → to ask a question.', 'We need → to leave now.'] } },
  { id: 'four-views-of-action', slug: 'four-views-of-action', title: 'Факт / процесс / результат / длительность', description: 'Четыре простых способа, которыми английский смотрит на действие.', category: 'expressing-meaning', beginnerFriendly: true, status: 'available', sample: { model: ['ФАКТ', 'ПРОЦЕСС', 'РЕЗУЛЬТАТ', 'ДЛИТЕЛЬНОСТЬ'], examples: ['I work here.', 'I’m working now.'] } },
  { id: 'how-english-sees-a-and-the', slug: 'how-english-sees-a-and-the', title: 'Как английский понимает a / the', description: 'Почему артикль показывает не слово, а то, как слушатель должен понимать предмет.', category: 'expressing-meaning', beginnerFriendly: true, status: 'available', sample: { model: ['ОДИН ИЗ МНОГИХ', 'УЖЕ ПОНЯТНЫЙ'], examples: ['I saw a dog.', 'The dog was friendly.'] } },
  { id: 'native-speakers-think-in-chunks', slug: 'native-speakers-think-in-chunks', title: 'Носитель хранит готовые фразы', description: "Почему depend on, at the moment и I don't think лучше воспринимать как цельные блоки.", category: 'building-thoughts', beginnerFriendly: true, status: 'available', sample: { model: ['ГОТОВЫЙ БЛОК', 'ТВОЯ МЫСЛЬ'], examples: ['It depends on the weather.', 'I don’t think it will work.'] } },
  { id: 'spoken-english-comes-in-thought-groups', slug: 'spoken-english-comes-in-thought-groups', title: 'Почему речь состоит из смысловых блоков', description: 'Почему живой английский лучше слышать группами, а не отдельными словами.', category: 'spoken-english', beginnerFriendly: false, status: 'available', sample: { model: ['СМЫСЛОВАЯ ГРУППА', 'ПАУЗА', 'СЛЕДУЮЩАЯ МЫСЛЬ'], examples: ['When I got home / I called her.', 'If you have time / we can talk.'] } },
  { id: 'speak-without-the-exact-word', slug: 'speak-without-the-exact-word', title: 'Как говорить, если забыл слово', description: 'Как продолжить мысль и объяснить идею другими словами, не останавливая разговор.', category: 'spoken-english', beginnerFriendly: false, status: 'available', sample: { model: ['НАЗНАЧЕНИЕ', 'ПРОСТОЕ ОПИСАНИЕ'], examples: ['It’s something you use to open a bottle.', 'It’s a place where you can borrow books.'] } },
];

export const getThinkResourceBySlug = (slug: string) => thinkInEnglishResources.find((resource) => resource.slug === slug);
export const getThinkCategoryLabel = (category: ThinkInEnglishCategory) => thinkInEnglishCategories.find((item) => item.id === category)!.label;
export const filterThinkResources = (category?: string | null) => thinkInEnglishResources.filter((resource) => !category || resource.category === category);

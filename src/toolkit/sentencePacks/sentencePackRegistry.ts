import type { SentencePack, SentencePackLevel, SentencePackTopic } from './sentencePackTypes';

export const sentencePackLevels: readonly { id: SentencePackLevel; label: string }[] = [
  { id: 'a1-a2', label: 'A1–A2' }, { id: 'b1', label: 'B1' },
  { id: 'b2', label: 'B2' }, { id: 'b2-c1', label: 'B2–C1' },
];
export const sentencePackTopics: readonly { id: SentencePackTopic; label: string }[] = [
  { id: 'everyday', label: 'Everyday' }, { id: 'social', label: 'Social' },
  { id: 'travel', label: 'Travel' }, { id: 'work', label: 'Work' },
  { id: 'tech-startup', label: 'Tech & Startup' },
];

// Short samples establish the template; final pack content will be added separately.
export const sentencePacks: readonly SentencePack[] = [
  { id: 'introducing-yourself', slug: 'introducing-yourself', title: 'Introducing Yourself', description: 'Знакомство, имя, город, работа и интересы.', level: 'a1-a2', topic: 'social', status: 'available', sample: { pattern: 'I’m from + PLACE', sentence: 'I’m from Kyiv.' } },
  { id: 'everyday-questions', slug: 'everyday-questions', title: 'Everyday Questions', description: 'Простые вопросы, просьбы, уточнения и переспросы.', level: 'a1-a2', topic: 'everyday', status: 'available', sample: { pattern: 'Could you + ACTION?', sentence: 'Could you help me?' } },
  { id: 'daily-plans', slug: 'daily-plans', title: 'Daily Plans', description: 'Планы на сегодня и завтра, время и встречи.', level: 'a1-a2', topic: 'everyday', status: 'available', sample: { pattern: 'I’m going to + ACTION', sentence: 'I’m going to call you tomorrow.' } },
  { id: 'cafe-shopping', slug: 'cafe-shopping', title: 'Cafe & Shopping', description: 'Заказ, цена, размер, оплата и простые просьбы.', level: 'a1-a2', topic: 'everyday', status: 'available', sample: { pattern: 'I’d like + THING', sentence: 'I’d like a coffee, please.' } },
  { id: 'small-talk', slug: 'small-talk', title: 'Small Talk', description: 'Разговор о работе, выходных, городе и интересах.', level: 'b1', topic: 'social', status: 'available', sample: { pattern: 'How was + EVENT?', sentence: 'How was your weekend?' } },
  { id: 'opinions-preferences', slug: 'opinions-preferences', title: 'Opinions & Preferences', description: 'Мнения, предпочтения, причины и простые сравнения.', level: 'b1', topic: 'social', status: 'available', sample: { pattern: 'I prefer + THING', sentence: 'I prefer quiet places.' } },
  { id: 'travel-problems', slug: 'travel-problems', title: 'Travel Problems', description: 'Отель, аэропорт, задержки и проблемы в поездке.', level: 'b1', topic: 'travel', status: 'available', sample: { pattern: 'There’s a problem with + THING', sentence: 'There’s a problem with my booking.' } },
  { id: 'work-updates', slug: 'work-updates', title: 'Work Updates', description: 'Что сделано, что происходит сейчас, проблемы и следующий шаг.', level: 'b1', topic: 'work', status: 'available', sample: { pattern: 'I’ve finished + TASK', sentence: 'I’ve finished the report.' } },
  { id: 'meetings', slug: 'meetings', title: 'Meetings', description: 'Начать встречу, высказать мнение, уточнить и подвести итог.', level: 'b2', topic: 'work', status: 'available', featured: true, sample: { pattern: 'I think we should + ACTION', sentence: 'I think we should discuss the next step.' } },
  { id: 'agreeing-disagreeing', slug: 'agreeing-disagreeing', title: 'Agreeing & Disagreeing', description: 'Согласиться, мягко возразить и предложить альтернативу.', level: 'b2', topic: 'work', status: 'available', sample: { pattern: 'I see your point, but + IDEA', sentence: 'I see your point, but we need more time.' } },
  { id: 'problems-solutions', slug: 'problems-solutions', title: 'Explaining Problems & Solutions', description: 'Объяснить проблему, причину, последствия и решение.', level: 'b2', topic: 'work', status: 'available', sample: { pattern: 'One option would be to + ACTION', sentence: 'One option would be to simplify the process.' } },
  { id: 'product-startup', slug: 'product-startup', title: 'Product & Startup English', description: 'Продукт, функции, пользователи, запуск и обратная связь.', level: 'b2', topic: 'tech-startup', status: 'available', sample: { pattern: 'This feature helps users + ACTION', sentence: 'This feature helps users save time.' } },
];

export const getSentencePackBySlug = (slug: string) => sentencePacks.find((pack) => pack.slug === slug);
export const getSentencePackLevelLabel = (level: SentencePackLevel) => sentencePackLevels.find((item) => item.id === level)!.label;
export const getSentencePackTopicLabel = (topic: SentencePackTopic) => sentencePackTopics.find((item) => item.id === topic)!.label;
export function filterSentencePacks(level?: string | null, topic?: string | null) {
  return sentencePacks.filter((pack) => (!level || pack.level === level) && (!topic || pack.topic === topic));
}

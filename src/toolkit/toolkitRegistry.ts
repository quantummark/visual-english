import { sentencePacks } from './sentencePacks/sentencePackRegistry';
import { thinkInEnglishResources } from './thinkInEnglish/thinkInEnglishRegistry';
import type { ToolkitCategory, ToolkitCategoryId } from './toolkitTypes';

export const toolkitCategories: readonly ToolkitCategory[] = [
  { id: 'sentence-packs', title: 'Sentence Packs', subtitle: 'Готовые фразы для реальных ситуаций', description: 'Не учи отдельные слова. Осваивай готовые конструкции, которые можно сразу использовать в разговоре.', action: 'Открыть наборы', countLabel: 'наборов', preview: ['I need to...', 'I’d like to...', 'Could you...?'] },
  { id: 'think-in-english', title: 'Think in English', subtitle: 'Пойми, как английский строит мысль', description: 'Меньше переводи с русского. Пойми, как английский показывает действие, время, предметы, связи и смысл.', action: 'Понять логику языка', countLabel: 'материалов', preview: ['КТО', 'ДЕЙСТВИЕ', 'ОБЪЕКТ', 'ДЕТАЛИ'] },
];

export function getToolkitResourceCount(category: ToolkitCategoryId) {
  const resources = category === 'sentence-packs' ? sentencePacks : thinkInEnglishResources;
  return resources.filter((resource) => resource.status === 'available').length;
}

import type { ToolkitResource } from '../toolkitTypes';

export type SentencePackLevel = 'a1-a2' | 'b1' | 'b2' | 'b2-c1';
export type SentencePackTopic = 'everyday' | 'social' | 'travel' | 'work' | 'tech-startup';

export interface SentencePack extends ToolkitResource {
  level: SentencePackLevel;
  topic: SentencePackTopic;
  sentenceCount?: number;
  patternCount?: number;
  sample: { pattern: string; sentence: string };
}

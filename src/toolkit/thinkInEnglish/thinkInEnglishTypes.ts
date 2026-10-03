import type { ToolkitResource } from '../toolkitTypes';

export type ThinkInEnglishCategory = 'building-thoughts' | 'expressing-meaning' | 'spoken-english';

export interface ThinkInEnglishResource extends ToolkitResource {
  category: ThinkInEnglishCategory;
  beginnerFriendly: boolean;
  sample: { model: readonly string[]; examples: readonly string[] };
}

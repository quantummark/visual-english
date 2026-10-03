export type Accent = 'blue' | 'orange' | 'green' | 'teal' | 'purple' | 'cyan';
export type CardId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface CourseCard {
  id: CardId;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  accent: Accent;
  visualTitle: string;
  previous: CardId | null;
  next: CardId | null;
}

export type ToolkitStatus = 'available' | 'coming-soon';
export type ToolkitCategoryId = 'sentence-packs' | 'think-in-english';

export interface ToolkitResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ToolkitStatus;
  featured?: boolean;
}

export interface ToolkitCategory {
  id: ToolkitCategoryId;
  title: string;
  subtitle: string;
  description: string;
  action: string;
  countLabel: string;
  preview: readonly string[];
}

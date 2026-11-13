/**
 * Unified type definitions for business frameworks, categories, and MBA pillars.
 * Extracted to break circular dependencies between src/frameworkData.ts and src/data/frameworks*.ts.
 */

export interface FrameworkContent {
  teori: {
    deskripsi: string;
    manfaat: string;
  };
  layout: {
    tipe: string;
    elemen: string[];
    visualType?: string;
  };
  draft: Array<{
    bagian: string;
    hint: string;
  }>;
  tutorial: Array<{
    step: string;
    desc: string;
  }>;
  actionPlan: string[];
}

export interface FrameworkCategory {
  name: string;
  pillar: string;
  frameworks: string[];
}

export interface MBAPillar {
  id: string;
  name: string;
  description: string;
  categories: string[];
}

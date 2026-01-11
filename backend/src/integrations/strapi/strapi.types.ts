
export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiRelation<T> {
  data: {
    id: number;
    attributes: T;
  } | {
    id: number;
    attributes: T;
  }[];
}

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: {};
}

// Entity Interfaces based on schemas

export interface StrapiArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // richtext
  featuredImage: { data: StrapiMedia };
  author: { data: StrapiAuthor };
  categories: { data: StrapiCategory[] };
  seo: any; // Component
  aeoBlocks: any[]; // Dynamic zone
  originalId: number;
  originalLink: string;
  comments: { data: StrapiComment[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAuthor {
  name: string;
  email: string;
  // Add other author fields if needed
}

export interface StrapiCategory {
  name: string;
  slug: string;
  description: string;
  parent: { data: StrapiCategory };
  children: { data: StrapiCategory[] };
  articles: { data: StrapiArticle[] }; // usually not needed in full
  seo: any;
  originalId: number;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiComment {
  content: string;
  authorName: string;
  authorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  parent: { data: StrapiComment };
  children: { data: StrapiComment[] };
  article: { data: StrapiArticle };
  isAuthorReply: boolean;
  ipAddress: string;
  userAgent: string;
  originalId: number;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiPage {
  title: string;
  slug: string;
  content: string;
  seo: any;
  aeoBlocks: any[];
  originalId: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPodcast {
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  duration: string;
  seo: any;
  aeoBlocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiRanking {
  title: string;
  slug: string;
  description: string;
  items: any[]; // component
  seo: any;
  aeoBlocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiSimulator {
  title: string;
  slug: string;
  description: string;
  type: 'loan' | 'investment' | 'financing' | 'other';
  parameters: any; // json
  seo: any;
  aeoBlocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiVideo {
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail: { data: StrapiMedia };
  seo: any;
  aeoBlocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

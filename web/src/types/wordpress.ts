export interface WordpressRenderedField {
  rendered: string;
}

export interface WordpressPost {
  id: number;
  slug: string;
  title: WordpressRenderedField;
  excerpt: WordpressRenderedField;
  date: string;
  _embedded?: Record<string, unknown>;
  [key: string]: unknown;
}

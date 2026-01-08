export interface WordpressRenderedField {
  rendered: string;
}

export interface WordpressPost {
  id: number | string;
  slug: string;
  title: WordpressRenderedField;
  excerpt: WordpressRenderedField;
  date: string;
  _embedded?: Record<string, unknown>;
  [key: string]: unknown;
}

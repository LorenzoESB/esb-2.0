
import { StrapiComment } from '../strapi.types';

export interface WordPressComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_email: string;
  author_url: string;
  date: string;
  content: { rendered: string };
  link: string;
  status: string;
  type: string;
  // Custom
  is_author_reply?: boolean;
}

export class CommentAdapter {
  static toWordPress(item: { id: number; attributes: StrapiComment }): WordPressComment {
    const { id, attributes } = item;
    return {
      id: attributes.originalId || id,
      post: attributes.article?.data?.id || 0,
      parent: attributes.parent?.data?.id || 0,
      author: 0, // Strapi comments might not be linked to a registered user in the same way
      author_name: attributes.authorName || 'Anonymous',
      author_email: attributes.authorEmail || '',
      author_url: '',
      date: attributes.createdAt,
      content: { rendered: attributes.content },
      link: '',
      status: attributes.status,
      type: 'comment',
      is_author_reply: attributes.isAuthorReply,
    };
  }
}

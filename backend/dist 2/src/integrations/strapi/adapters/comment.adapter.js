"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAdapter = void 0;
class CommentAdapter {
    static toWordPress(item) {
        const { id, attributes } = item;
        return {
            id: attributes.originalId || id,
            post: attributes.article?.data?.id || 0,
            parent: attributes.parent?.data?.id || 0,
            author: 0,
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
exports.CommentAdapter = CommentAdapter;
//# sourceMappingURL=comment.adapter.js.map
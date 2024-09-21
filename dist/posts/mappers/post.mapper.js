"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostDto = mapToPostDto;
function mapToPostDto(db) {
    return {
        id: db.id,
        comment_id: db.comment_id,
        user_id: db.user_id,
    };
}
//# sourceMappingURL=post.mapper.js.map
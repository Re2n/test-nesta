"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PostDto {
}
exports.PostDto = PostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the post',
        type: Number,
    }),
    __metadata("design:type", Number)
], PostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of comment id',
        type: [Number],
    }),
    __metadata("design:type", Array)
], PostDto.prototype, "comment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifier of the creator post',
        type: Number,
    }),
    __metadata("design:type", Number)
], PostDto.prototype, "user_id", void 0);
//# sourceMappingURL=post.dto.js.map
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from 'src/auth/auth.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from '../comment.service';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dto/comment-create.dto';
import { Comment } from '../models/comment.model';

@Resolver(Comment)
export class CommentMutationResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async createComment(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.commentService.createComment(user, input);
  }
}

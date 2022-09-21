import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from 'src/auth/auth.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dtos/article-create.dto';
import { ArticleDeleteOutput } from '../dtos/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dtos/article-update.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async createArticle(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.createArticle(user, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleUpdateOutput)
  async updateArticle(
    @Args({ name: 'id', type: () => ID }) id: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleDeleteOutput)
  async deleteArticle(@Args({ name: 'id', type: () => ID }) id: Article['id']) {
    return this.articleService.deleteArticle(id);
  }
}

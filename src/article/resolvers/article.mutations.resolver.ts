import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => ArticleCreateOutput)
  async createArticle(@Args('input') input: ArticleCreateInput) {
    return this.articleService.createArticle(input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async updateArticle(
    @Args({ name: 'id', type: () => ID }) id: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(id, input);
  }

  @Mutation(() => ArticleDeleteOutput)
  async deleteArticle(@Args({ name: 'id', type: () => ID }) id: Article['id']) {
    return this.articleService.deleteArticle(id);
  }
}

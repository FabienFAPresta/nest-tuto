import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dtos/article-create.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async createArticle(@Args('input') input: ArticleCreateInput) {
    return this.articleService.createArticle(input);
  }
}

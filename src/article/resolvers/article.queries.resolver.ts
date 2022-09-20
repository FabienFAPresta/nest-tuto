import { Args, Query, Resolver } from '@nestjs/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';
import { ArticleService } from '../article.service';
import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from '../dtos/articles-pagination.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlesPagination)
  async articleList(@Args() args: ArticlesPaginationArgs) {
    return this.articleService.articlesList(args);
  }
}

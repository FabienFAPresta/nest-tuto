import { Args, Query, Resolver } from '@nestjs/graphql';
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
  async articleList(
    @Args() args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    return this.articleService.articlesList(args);
  }
}

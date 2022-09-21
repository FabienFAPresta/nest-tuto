import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from 'src/auth/auth.service';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import { User } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dtos/article-create.dto';
import { ArticleDeleteOutput } from './dtos/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dtos/article-update.dto';
import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from './dtos/articles-pagination.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(
    user: JWTPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
    article.author = new User();
    article.author.id = user.id;
    await article.save();
    return { article };
  }

  async updateArticle(
    id: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneByOrFail({ id });

    article.title = input.title;
    article.description = input.description;
    article.image = input.image;
    await article.save();

    return { article };
  }

  async deleteArticle(id: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneByOrFail({ id });
    await article.remove();

    return { id };
  }

  async articlesList(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    const qb = this.articleRepository
      .createQueryBuilder('article')
      .take(args.take)
      .skip(args.skip);

    if (args.sortBy) {
      if (args.sortBy.createdAt) {
        qb.addOrderBy(
          'article.createdAt',
          (args.sortBy.createdAt as SortDirection) === SortDirection.ASC
            ? 'ASC'
            : 'DESC',
        );
      }

      if (args.sortBy.title) {
        qb.addOrderBy(
          'article.title',
          (args.sortBy.title as SortDirection) === SortDirection.ASC
            ? 'ASC'
            : 'DESC',
        );
      }
    }

    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }
}

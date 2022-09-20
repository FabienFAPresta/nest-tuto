import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
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

  async articleList(): Promise<Article[]> {
    return this.articleRepository.find();
  }
}

import { Resolver } from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { User } from '../models/user.model';

@Resolver(User)
export class UserFieldsResolver {
  constructor(private articleService: ArticleService) {}

  //   @ResolveField(() => Article, { nullable: true })
  //   async articles(@Parent() user: User): Promise<Article[]> {
  //     try {
  //       return await this.articleService.getArticleByAuthorId(user.id);
  //     } catch (e) {
  //       return [];
  //     }
  //   }
}

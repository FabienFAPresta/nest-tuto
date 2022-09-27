import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { UserModule } from 'src/user/user.module';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { CommentMutationResolver } from './resolvers/comment.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticleModule, UserModule],
  providers: [CommentService, CommentMutationResolver],
})
export class CommentModule {}

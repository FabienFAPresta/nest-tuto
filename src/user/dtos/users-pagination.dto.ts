import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Pagination, PaginationArgs } from 'src/pagination/dto/pagination.dto';
import { User } from '../models/user.model';

@ArgsType()
export class UsersPaginationArgs extends PaginationArgs {}

@ObjectType()
export class UsersPagination extends Pagination {
  @Field(() => [User])
  nodes: User[];
}

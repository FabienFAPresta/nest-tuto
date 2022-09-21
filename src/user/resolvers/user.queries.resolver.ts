import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  UsersPagination,
  UsersPaginationArgs,
} from '../dtos/users-pagination.dto';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(User)
export class UserQueriesResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UsersPagination)
  async userList(@Args() args: UsersPaginationArgs): Promise<UsersPagination> {
    return this.userService.userList(args);
  }
}

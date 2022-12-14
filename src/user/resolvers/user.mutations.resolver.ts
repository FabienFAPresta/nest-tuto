import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput, UserCreateOutput } from '../dtos/user-create.dto';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(User)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async userCreate(@Args('input') input: UserCreateInput) {
    return this.userService.userCreate(input);
  }
}

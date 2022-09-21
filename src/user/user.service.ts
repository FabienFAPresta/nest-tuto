import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, SortDirection } from 'src/pagination/dto/pagination.dto';
import { Repository } from 'typeorm';
import { UserCreateInput, UserCreateOutput } from './dtos/user-create.dto';
import {
  UsersPagination,
  UsersPaginationArgs,
} from './dtos/users-pagination.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async userGet(email: User['email']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email });
  }

  async userCreate(input: UserCreateInput): Promise<UserCreateOutput> {
    const user = this.userRepository.create(input);
    await user.save();
    return { user };
  }

  async userGetById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  /**
   * Get the user liste
   *
   * @param   {UsersPaginationArgs}       args      Arguments for filter and sort
   * @returns {Promise<UsersPagination>}            Results
   */
  async userList(args: UsersPaginationArgs): Promise<UsersPagination> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .take(args.take)
      .skip(args.skip);

    if (args.sortBy) {
      if (args.sortBy.createdAt) {
        qb.addOrderBy(
          'user.createdAt',
          (args.sortBy.createdAt as SortDirection) === SortDirection.ASC
            ? 'ASC'
            : 'DESC',
        );
      }
    }

    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }
}

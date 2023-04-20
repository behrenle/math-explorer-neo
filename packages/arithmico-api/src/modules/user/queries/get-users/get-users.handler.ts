import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../infrastructure/database/repositories/user.repository';
import { GetUsersQuery } from './get-users.query';
import { GetUsersResponseDto } from './get-users.response.dto';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResponseDto> {
    const result = await this.userRepository.getUsers({
      skip: query.skip,
      limit: query.limit,
    });
    return {
      items: result.items.map((item) => ({
        userId: item._id,
        username: item.username,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }
}
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async byId(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch('/:id')
  async edit(
    @Param('id') id: number,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ) {
    return this.userService.edit(id, firstName, lastName);
  }

  @Get('/:id/bookmarks')
  async bookmarks(@Param('id') id: number) {
    return this.userService.getBookmarks(id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: +id,
      },
    });

    if (!user || typeof user == 'undefined')
      throw new NotFoundException('User not found');

    delete user.hash;

    return { msg: 'OK', user: user };
  }

  async edit(id: number, firstName?: string, lastName?: string) {
    let data = {};

    if (firstName) data['firstName'] = firstName;
    if (lastName) data['lastName'] = lastName;

    const user = await this.prismaService.user.update({
      where: {
        id: +id,
      },
      data: {
        firstName,
        lastName,
      },
    });

    delete user.hash;

    return { msg: 'Updated', user: user };
  }

  async getBookmarks(id: number) {
    const bookmarks = await this.prismaService.bookmark.findMany({
      where: { userId: +id },
    });

    if (!bookmarks || typeof bookmarks == 'undefined')
      throw new NotFoundException('User not found');

    return { msg: 'OK', bookmarks: bookmarks };
  }
}

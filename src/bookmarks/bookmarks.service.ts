import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from 'src/typings/dto/bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: BookmarkDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
    });

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');

    const bookmark = await this.prismaService.bookmark.create({
      data: {
        title: dto.title,
        link: dto.link,
        description: dto.description ? dto.description : null,
        userId: dto.userId,
      },
    });

    return { msg: 'Created', bookmark };
  }
}

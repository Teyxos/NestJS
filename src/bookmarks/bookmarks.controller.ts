import { Body, Controller, Post } from '@nestjs/common';
import { BookmarkDto } from 'src/typings/dto/bookmark.dto';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarkService: BookmarksService) {}

  @Post('/new')
  async newBookmark(@Body() dto: BookmarkDto) {
    return this.bookmarkService.create(dto);
  }
}

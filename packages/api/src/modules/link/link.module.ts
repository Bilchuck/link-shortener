import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkService } from './services/link.service';
import { ShortLinkValidator } from './services/short-link.validator';
import { LinkController } from './link.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
  ],
  providers: [LinkService, ShortLinkValidator],
  controllers: [LinkController],
})
export class LinkModule {}

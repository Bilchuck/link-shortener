import { Controller, Get, Param, Response, Post, Body, BadRequestException } from '@nestjs/common';
import { LinkService } from './services/link.service';
import * as express from 'express' ;
import { Link } from './link.entity';
import { ShortLinkAlreadyRegistered } from './exceptions/short-link-already-registered.exception';
import { InvalidShortLinkFormat } from './exceptions/invalid-short-link-format.exception';

@Controller('link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
  ) {}

  @Get(':linkHash')
  async redirectToOriginalLink(
    @Param('linkHash') linkHash: string,
    @Response() response: express.Response,
  ) {
    const originalLink = await this.linkService.getOriginalLinkByShort(linkHash);
    if (!originalLink) {
      response.sendStatus(404);
    } else {
      response.redirect(originalLink);
    }
  }

  @Post()
  async saveShortLink(
    @Body() body: Omit<Link, 'id'>,
  ) {
    try {
      await this.linkService.saveShortLink(body.shortLinkHash, body.originalUrl);
    } catch (err) {
      if (err instanceof ShortLinkAlreadyRegistered) {
        throw new BadRequestException(`${body.shortLinkHash} already used!`);
      }
      if (err instanceof InvalidShortLinkFormat) {
        throw new BadRequestException(`${body.shortLinkHash} has invalid format!`);
      }
      throw err;
    }
  }
}

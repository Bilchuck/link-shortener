import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../link.entity';
import { ShortLinkValidator } from './short-link.validator';
import { ShortLinkAlreadyRegistered } from '../exceptions/short-link-already-registered.exception';
import { PostgresErrorCodes } from '../../../utils/postgres-error-codes.enum';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    private readonly shortLinkValidator: ShortLinkValidator,
  ) {}

  async getOriginalLinkByShort(shortLinkHash: string): Promise<string | null> {
    const link = await this.linkRepo.findOne({ shortLinkHash });
    return link?.originalUrl ?? null;
  }

  async saveShortLink(shortLinkHash: string, originalUrl: string) {
    this.shortLinkValidator.validateShortLinkHash(shortLinkHash);
    try {
      await this.linkRepo.save({
        shortLinkHash,
        originalUrl,
      });
    } catch (err) {
      if (err.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
        throw new ShortLinkAlreadyRegistered();
      }
      throw err;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InvalidShortLinkFormat } from '../exceptions/invalid-short-link-format.exception';

@Injectable()
export class ShortLinkValidator {
  private readonly regExp = RegExp('[A-Za-z]+$');

  public validateShortLinkHash(hash: string): void {
    const isValid = this.regExp.test(hash);
    if (!isValid) {
      throw new InvalidShortLinkFormat();
    }
  }
}

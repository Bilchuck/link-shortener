import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameLinkColumn1592434450471 implements MigrationInterface {
    name = 'RenameLinkColumn1592434450471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" RENAME COLUMN "shortLink" TO "shortLinkHash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" RENAME COLUMN "shortLinkHash" TO "shortLink"`);
    }

}

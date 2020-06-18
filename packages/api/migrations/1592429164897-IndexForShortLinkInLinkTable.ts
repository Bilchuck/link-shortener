import {MigrationInterface, QueryRunner} from "typeorm";

export class IndexForShortLinkInLinkTable1592429164897 implements MigrationInterface {
    name = 'IndexFprShortLinkInLinkTable1592429164897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "UQ_32d73eae49940ad4c1505ccbada" UNIQUE ("shortLink")`);
        await queryRunner.query(`CREATE INDEX "IDX_32d73eae49940ad4c1505ccbad" ON "link" ("shortLink") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_32d73eae49940ad4c1505ccbad"`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "UQ_32d73eae49940ad4c1505ccbada"`);
    }

}

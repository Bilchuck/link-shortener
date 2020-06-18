import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLinkTable1592428662516 implements MigrationInterface {
    name = 'CreateLinkTable1592428662516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "link" ("id" SERIAL NOT NULL, "originalUrl" character varying NOT NULL, "shortLink" character varying NOT NULL, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "link"`);
    }

}

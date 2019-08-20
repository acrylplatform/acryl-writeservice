import {MigrationInterface, QueryRunner} from "typeorm";

export class updateObjTable1566298692600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "objects" ADD "prevHash" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "objects" DROP COLUMN "prevHash"`);
    }

}

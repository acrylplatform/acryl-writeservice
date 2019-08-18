import { MigrationInterface, QueryRunner } from 'typeorm';

export class createObjectTable1565867310653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "objects" (
            "id" SERIAL NOT NULL, 
            "idFromUser" character varying(100) NOT NULL, 
            "rawData" json NOT NULL, 
            "txHash" character varying, 
            "txDate" TIMESTAMP WITH TIME ZONE, 
            "txStatus" boolean NOT NULL DEFAULT false, 
            "writeData" json, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_87b86663af0123508099f0d970a" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "objects"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCart1621367060953 implements MigrationInterface {
  name = 'createCart1621367060953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart" ("shoppingCartId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "totalPrice" integer NOT NULL, "totalQuantity" integer NOT NULL, CONSTRAINT "PK_e4f6c652de6aecc99362aa0f302" PRIMARY KEY ("shoppingCartId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cart"`);
  }
}

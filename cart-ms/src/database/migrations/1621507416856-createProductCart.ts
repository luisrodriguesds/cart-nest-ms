import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createProductCart1621507416856 implements MigrationInterface {
  name = 'createProductCart1621507416856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cart_id" uuid NOT NULL, "product_id" uuid NOT NULL, "price" decimal NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_a9eb3c6b183961debec3a968f91" PRIMARY KEY ("id"))`,
    );

    await queryRunner.createForeignKey(
      'product_cart',
      new TableForeignKey({
        name: 'CartProductCart',
        columnNames: ['cart_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cart',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_cart"`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitApp1749544379641 implements MigrationInterface {
    name = 'InitApp1749544379641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '-', "image" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "about" character varying NOT NULL DEFAULT 'Пока ничего не рассказал о себе', "avatar" character varying NOT NULL DEFAULT 'https://i.pravatar.cc/300', "email" character varying NOT NULL, "password" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL, "hidden" boolean NOT NULL DEFAULT false, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "itemId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wish" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "image" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "raised" numeric(10,2) NOT NULL DEFAULT '0', "description" character varying NOT NULL, "copied" integer NOT NULL DEFAULT '0', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_e338d8f62014703650439326d3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist_items" ("wishlist_id" integer NOT NULL, "wish_id" integer NOT NULL, CONSTRAINT "PK_cc2875c1dcdaf818b3e96aecede" PRIMARY KEY ("wishlist_id", "wish_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_754a9ecec7627d432c2134dd00" ON "wishlist_items" ("wishlist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_62cddeb04bfff67d8b07c1ae7e" ON "wishlist_items" ("wish_id") `);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_acf92a9b67b36657847695751ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_40199af67b763fc3ecc5a0d44e0" FOREIGN KEY ("itemId") REFERENCES "wish"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wish" ADD CONSTRAINT "FK_d976be560c304e5396c50bd72c4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" ADD CONSTRAINT "FK_754a9ecec7627d432c2134dd00e" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" ADD CONSTRAINT "FK_62cddeb04bfff67d8b07c1ae7e0" FOREIGN KEY ("wish_id") REFERENCES "wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist_items" DROP CONSTRAINT "FK_62cddeb04bfff67d8b07c1ae7e0"`);
        await queryRunner.query(`ALTER TABLE "wishlist_items" DROP CONSTRAINT "FK_754a9ecec7627d432c2134dd00e"`);
        await queryRunner.query(`ALTER TABLE "wish" DROP CONSTRAINT "FK_d976be560c304e5396c50bd72c4"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_40199af67b763fc3ecc5a0d44e0"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_e8100751be1076656606ae045e3"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_acf92a9b67b36657847695751ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62cddeb04bfff67d8b07c1ae7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_754a9ecec7627d432c2134dd00"`);
        await queryRunner.query(`DROP TABLE "wishlist_items"`);
        await queryRunner.query(`DROP TABLE "wish"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
    }

}

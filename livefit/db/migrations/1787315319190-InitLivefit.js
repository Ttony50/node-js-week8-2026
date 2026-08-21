import { MigrationInterface, QueryRunner } from "typeorm";

export class InitLivefit1787315319190 implements MigrationInterface {

    async up(queryRunner) {
  await queryRunner.query(`
    CREATE TABLE "USER" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" varchar(50) NOT NULL,
      "email" varchar(320) NOT NULL,
      "role" varchar(20) NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT now(),
      "updated_at" timestamp NOT NULL DEFAULT now(),
      CONSTRAINT "PK_USER" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email")
    )
  `);

  await queryRunner.query(`
    CREATE TABLE "SKILL" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" varchar(50) NOT NULL,
      CONSTRAINT "PK_SKILL" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_SKILL_NAME" UNIQUE ("name")
    )
  `);

  await queryRunner.query(`
    CREATE TABLE "COURSE" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" varchar(100) NOT NULL,
      "description" text NOT NULL,
      "start_at" timestamp NOT NULL,
      "end_at" timestamp NOT NULL,
      "max_participants" integer NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT now(),
      "updated_at" timestamp NOT NULL DEFAULT now(),
      "user_id" uuid NOT NULL,
      "skill_id" uuid NOT NULL,
      CONSTRAINT "PK_COURSE" PRIMARY KEY ("id"),
      CONSTRAINT "FK_COURSE_USER"
        FOREIGN KEY ("user_id") REFERENCES "USER"("id"),
      CONSTRAINT "FK_COURSE_SKILL"
        FOREIGN KEY ("skill_id") REFERENCES "SKILL"("id")
    )
  `);
}

   async down(queryRunner) {
  await queryRunner.query(`DROP TABLE "COURSE"`);
  await queryRunner.query(`DROP TABLE "SKILL"`);
  await queryRunner.query(`DROP TABLE "USER"`);
}

}

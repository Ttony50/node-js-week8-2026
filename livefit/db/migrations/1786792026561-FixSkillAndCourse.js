/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixSkillAndCourse1786792026561 {
    name = 'FixSkillAndCourse1786792026561'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "SKILL" DROP CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de"`);
        await queryRunner.query(`ALTER TABLE "SKILL" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "SKILL" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SKILL" ADD CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "description" text NOT NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "description" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SKILL" DROP CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de"`);
        await queryRunner.query(`ALTER TABLE "SKILL" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "SKILL" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SKILL" ADD CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de" UNIQUE ("name")`);
    }
}

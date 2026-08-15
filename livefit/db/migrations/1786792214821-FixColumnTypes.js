/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixColumnTypes1786792214821 {
    name = 'FixColumnTypes1786792214821'

    /**
     * @param {QueryRunner} queryRunner
     */
async up(queryRunner) {
  await queryRunner.query(`
    ALTER TABLE "SKILL"
    ALTER COLUMN "name" TYPE varchar(50)
  `);

  await queryRunner.query(`
    ALTER TABLE "COURSE"
    ALTER COLUMN "description" TYPE text
  `);
}
    /**
     * @param {QueryRunner} queryRunner
     */
async down(queryRunner) {
  await queryRunner.query(`
    ALTER TABLE "COURSE"
    ALTER COLUMN "description" TYPE varchar(100)
  `);

  await queryRunner.query(`
    ALTER TABLE "SKILL"
    ALTER COLUMN "name" TYPE varchar
  `);
}
}

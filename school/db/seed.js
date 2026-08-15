/**
 * 任務 5：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require("./data-source");

async function clearAll() {
  // 先刪除有外鍵的資料表
  await dataSource.query(`DELETE FROM "GRADE"`);
  await dataSource.query(`DELETE FROM "STUDENT"`);
  await dataSource.query(`DELETE FROM "SUBJECT"`);
  await dataSource.query(`DELETE FROM "CLASS"`);
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  // ================================================================================
  // TODO：依照任務內容的規格種資料（至少 2 班、2 科目、幾位學生、幾筆成績）
  //   1. 先種 CLASS / SUBJECT
  //   2. 再種 STUDENT（記得接上 class）
  //   3. 最後種 GRADE（記得接上 student + subject）
  //      關聯的接法：relation 屬性直接放前面存好的物件（TypeORM 會自動取出 id 填進外鍵），例如：
  //      studentRepo.save({ name: '...', class: 班級物件 })
  //      gradeRepo.save({ score: 95, student: 學生物件, subject: 科目物件 })
  // ================================================================================
  // 建立兩個班級
  const classes = await dataSource.query(
    `INSERT INTO "CLASS" ("name")
     VALUES ($1), ($2)
     RETURNING "id"`,
    ["一年甲班", "一年乙班"]
  );

  // 建立兩個科目
  const subjects = await dataSource.query(
    `INSERT INTO "SUBJECT" ("name")
     VALUES ($1), ($2)
     RETURNING "id"`,
    ["數學", "英文"]
  );

  // 建立學生並接上班級
  const students = await dataSource.query(
    `INSERT INTO "STUDENT" ("name", "class_id")
     VALUES ($1, $2)
     RETURNING "id"`,
    ["小明", classes[0].id]
  );

  // 建立成績並接上學生與科目
  await dataSource.query(
    `INSERT INTO "GRADE" ("score", "student_id", "subject_id")
     VALUES ($1, $2, $3)`,
    [90, students[0].id, subjects[0].id]
  );
  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })

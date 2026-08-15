const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
  name: "Course",
  tableName: "COURSE",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar", length: 100, nullable: false },
    description: { type:"text", nullable: false },
    start_at: { type: "timestamp" , nullable: false},
    end_at: { type: "timestamp" , nullable: false},
    max_participants: { type: "integer", nullable: false},
    created_at: { type: "timestamp", createDate: true},
    updated_at: { type: "timestamp", updateDate: true},
  },
  relations: {
    user: {
      // 屬性名（程式內用）
      type: "many-to-one", // 多對一
      target: "User", // 指向的 entity name（不是 tableName！）
      joinColumn: { name: "user_id" }, // 外鍵欄位名
    },
    skill: {
      type: "many-to-one",
      target: "Skill",
      joinColumn: { name: "skill_id" },
    },
  },
});
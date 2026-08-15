const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User", // Entity 名稱（程式內使用，供 relation target 引用）
  tableName: "USER", // 實際資料表名（SQL 層級）
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid", // 自動產生 UUID
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false, // NOT NULL = 必填
    },
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true, // UNIQUE = 不可重複
    },
    role: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true, // INSERT 時自動帶入時間
    },
    updated_at: {
      type: "timestamp",
      updateDate: true, // UPDATE 時自動更新時間
    },
  },
});

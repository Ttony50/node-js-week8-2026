require("dotenv").config();

const path = require("path");
const { DataSource } = require("typeorm");

const User = require("../entities/User");
const Skill = require("../entities/Skill");
const Course = require("../entities/Course");

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || "student",
  password: process.env.DB_PASSWORD || "student666",
  database: process.env.DB_DATABASE || "livefit",

  synchronize: false,

  entities: [User, Skill, Course],

  migrations: [path.join(__dirname, "migrations", "*.js")],
});

module.exports = { dataSource };

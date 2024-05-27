module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Rana2003",
  DB: "supernova",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

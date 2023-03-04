// eslint-disable-next-line import/prefer-default-export
export const config = {
  development: {
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "Hosi3731!",
    database: process.env.MYSQL_DATABASE || "blogs",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.MYSQL_PORT || 3306,
  },
};

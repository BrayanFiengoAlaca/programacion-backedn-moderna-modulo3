//Abre la puerta hacia la base de datos.
import { Sequelize } from "sequelize";
 
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: 3306,
    dialect: "mysql",
    logging: false,
  }
);
 
export const connectMysql = async () => {
  try {
    await sequelize.authenticate(); // necesita usuario, contraseña, host y nombre de la base de datos para conectarse a mysql
    await sequelize.sync({ alter: true });
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  }
};


export default sequelize;
//Abre la puerta hacia la base de datos.
import { Sequelize } from "sequelize";
 
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
    process.env.DB_PASSWORD,{
      host: process.env.DB_HOST,
      dialect: "mysql",
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
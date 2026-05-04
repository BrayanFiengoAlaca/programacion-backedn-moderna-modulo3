//Genera y verifica tokens de sesión.
import jwt from "jsonwebtoken";

export default class JwtService {
  static generateToken(payload) {
    // definiremos que vamos a poner ahi  {id ,  email,  role }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
  }
  //verifica que el token sea valido, y si lo es, devuelve el payload que se le puso al generar el token. Si no es valido, lanza un error.
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
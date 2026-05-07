// Aquí definimos la lógica de negocio relacionada con la autenticación, como registrar usuarios y generar tokens JWT.
import UserEntity from "../../domain/entities/user.entity.js";
import HashService from "../../infrastructure/security/hash.service.js";
import JwtService from "../../infrastructure/security/jwt.service.js";

// 
export default class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // 1. Registro de usuario
  async register(data) {
    const exist = await this.userRepository.findByEmail(data.email); // Verifica si el correo ya está registrado
    if (exist) {
      throw new Error("Email already in use"); //Correo electrónico ya en uso
    }

    data.password = await HashService.hash(data.password); // Encripta la contraseña usando el HashService
    const newUser = new UserEntity(data); // Crea una nueva entidad de usuario con los datos recibidos
    await this.userRepository.save(newUser); // Guarda el nuevo usuario en la base de datos usando el repositorio
    return { message: "User registered successfully" }; //Usuario registrado exitosamente
  }
  
  // 2. Login de usuario
  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email); // Busca el usuario por correo electrónico usando el repositorio
    if (!user) {
      throw new Error("Invalid credentials"); //Credenciales inválidas
    }

    const isMatch = await HashService.compare(password, user.password);// Compara la contraseña ingresada con la contraseña almacenada usando el HashService
    if (!isMatch) {
      throw new Error("Invalid credentials"); //Credenciales inválidas
    }
    
    // Si las credenciales son válidas, genera un token JWT con la información del usuario usando el JwtService
    const token = JwtService.generateToken({ 
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token }; // Devuelve el token generado al cliente
  }
}
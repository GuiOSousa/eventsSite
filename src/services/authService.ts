import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
	static async login(email: string, password: string): Promise<string> {
		try {
            const user = await UserRepository.getByEmail(email);

            if (!user) {
                throw { statusCode: 401, message: "Usuário não encontrado." }
            }
    
            
            const valid = password === user.password
            if (!valid) {
                throw new Error("Senha incorreta")
            }

            //const valid = await bcrypt.compare(password, user.password)
            //if (!valid) {
            //    throw { statusCode: 401, message: "Senha incorreta." }
            //}
    
    
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET ||"minha_chave_secreta",
                { expiresIn: "1h" }
            );
    
            return token;
        } catch (error: any) {
            throw error
        }   
        
	}
}

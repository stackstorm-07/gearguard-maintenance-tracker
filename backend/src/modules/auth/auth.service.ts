import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../users/users.service";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const AuthService = {
  async register(data: any) {
    const existing = await UserService.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await UserService.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || "TECHNICIAN",
      companyId: data.companyId,
    });

    return user;
  },

  async login(email: string, password: string) {
    const user = await UserService.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      {
        userId: user.id,
        companyId: user.companyId,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return { token };
  },
};

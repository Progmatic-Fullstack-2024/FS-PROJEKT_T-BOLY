import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { JWT_SECRET } from "../constants/constants.js";

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError("Invalid email or password", 403);

  const isPasswordValid = await bycrypt.compare(password, user.passwordHash);
  console.log(isPasswordValid);
  if (!isPasswordValid) throw new HttpError("Invalid email or password", 403);

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

const register = async ({ email, username, password, firstName, lastName }) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser)
    throw new HttpError("Email or username already exists", 400);

  const hashedPassword = await bycrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashedPassword,
      firstName,
      lastName,
    },
  });

  return newUser;
};

export default { register, login };

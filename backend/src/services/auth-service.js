import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { JWT_SECRET } from "../constants/constants.js";

const login = async ({ identifier, password }) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
  });
  if (!user) throw new HttpError("Invalid username or email", 403);

  const isPasswordValid = await bycrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new HttpError("Invalid password", 403);

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    address: user.address,
    billingAddress: user.billingAddress,
    profilePictureUrl: user.profilePictureUrl,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

const register = async ({
  email,
  username,
  role,
  password,
  firstName,
  lastName,
}) => {
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
      role,
      passwordHash: hashedPassword,
      firstName,
      lastName,
    },
  });

  return newUser;
};

const passwordUpdate = async (id, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  const isPasswordValid = await bycrypt.compare(oldPassword, user.passwordHash);

  if (!isPasswordValid) {
    throw new HttpError("Invalid password", 403);
  }

  const hashedNewPassword = await bycrypt.hash(newPassword, 5);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { passwordHash: hashedNewPassword },
  });

  return updatedUser;
};

const forgottenPasswordUpdate = async (username, email) => {
  const user = await prisma.user.findFirst({
    where: { AND: [{ email }, { username }] },
  });
  if (!user)
    throw new HttpError(
      "This email adress or username is not registered in our sysem",
      403,
    );

  const allChars =
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "0123456789" +
    "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let randomPassword = "";
  for (let i = 0; i < 12; i += 1) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    randomPassword += allChars[randomIndex];
  }

  const hashedNewPassword = await bycrypt.hash(randomPassword, 5);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashedNewPassword },
  });

  return randomPassword;
};

export default { register, login, passwordUpdate, forgottenPasswordUpdate };

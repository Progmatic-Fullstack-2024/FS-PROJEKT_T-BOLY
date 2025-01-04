import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import bycrypt from "bcrypt";

const register = async ({ email, username, password, passwordAgain }) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
  if (existingUser)
    throw new HttpError("Email or username already exists", 400);

  if (password != passwordAgain)
    throw new HttpError(
      "The password confirmation does not match the password.",
      404
    );
  const hashedPassword = await bycrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: { email, username, passwordHash: hashedPassword },
  });
  return newUser;
};

export default { register };

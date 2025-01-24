import jwt from "jsonwebtoken";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { JWT_SECRET } from "../constants/constants.js";
import imageService from "./image-service.js";

const updateUser = async (id, userData) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new HttpError("User not found", 404);

  const usernameExist = await prisma.user.findFirst({
    where: {
      AND: [{ username: userData.username }, { id: { not: id } }],
    },
  });
  if (userData.username && usernameExist)
    throw new HttpError("Username is taken", 404);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });

  const token = jwt.sign(
    {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      birthDate: updatedUser.birthDate,
      adress: updatedUser.adress,
      billingAdress: updatedUser.billingAdress,
      profilePictureUrl: user.profilePictureUrl,
    },
    JWT_SECRET,
  );

  return { token, updatedUser };
};

const listUsernames = async (id) => {
  const users = await prisma.user.findMany({
    where: {
      id: { not: id },
    },
    select: { username: true },
  });
  const usernames = users.map((user) => user.username);
  return usernames;
};

const updateProfilePicture = async (id, userData) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new HttpError("User not found", 404);
  if (user.profilePictureUrl && userData.profilePictureUrl) {
    await imageService.deleteFile(user.profilePictureUrl);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });
  console.log("updated", updatedUser);

  const token = jwt.sign(
    {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      birthDate: updatedUser.birthDate,
      adress: updatedUser.adress,
      billingAdress: updatedUser.billingAdress,
      profilePictureUrl: updatedUser.profilePictureUrl,
    },
    JWT_SECRET,
  );

  return { token, updatedUser };
};

export default { updateUser, listUsernames, updateProfilePicture };

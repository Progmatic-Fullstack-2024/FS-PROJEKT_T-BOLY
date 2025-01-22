import jwt from "jsonwebtoken";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { JWT_SECRET } from "../constants/constants.js";

const updateUser = async (id, userData, currentUserId, currentUserRole) => {
  if (id !== currentUserId && currentUserRole !== "ADMIN") {
    throw new HttpError("Unauthorized", 403);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new HttpError("User not found", 404);

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
      profilePictureUrl: updatedUser.profilePictureUrl,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, updatedUser };
};

const deleteUser = async (id, currentUserId, currentUserRole) => {
  if (id !== currentUserId && currentUserRole !== "ADMIN") {
    throw new HttpError("Unauthorized", 403);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new HttpError("User not found", 404);

  await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });

  return { message: "User deactivated successfully." };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new HttpError("User not found", 404);

  return user;
};

const getAllUsers = async (
  sorting,
  order,
  pageNumber,
  limitNumber,
  filterByRole,
  filterByIsActive
) => {
  const where = {
    AND: [
      ...(filterByRole ? [{ role: filterByRole }] : []),
      ...(filterByIsActive !== undefined
        ? [{ isActive: filterByIsActive }]
        : []),
    ],
  };

  const orderBy = sorting ? { [sorting]: order || "asc" } : undefined;
  const skip = (pageNumber - 1) * limitNumber;
  const take = limitNumber;

  const users = await prisma.user.findMany({
    where,
    orderBy,
    skip,
    take,
  });

  const totalUsers = await prisma.user.count({ where });
  const totalPages = Math.ceil(totalUsers / limitNumber);

  return { users, totalUsers, totalPages };
};

export default { updateUser, deleteUser, getUserById, getAllUsers };

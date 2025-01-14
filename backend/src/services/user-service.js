import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constants/constants.js";

const updateUser = async (id, userData) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  
  if (!user) throw new HttpError("User not found", 404);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData, 
  });

  const token = jwt.sign(
    {  id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        birthDate: updatedUser.birthDate,
        adress: updatedUser.adress,
        billingAdress: updatedUser.billingAdress,
        profilePictureUrl: updatedUser.profilePictureUrl, },
    JWT_SECRET, 
    { expiresIn: '1h' } 
  );

  return { token, updatedUser};
};

export default { updateUser };

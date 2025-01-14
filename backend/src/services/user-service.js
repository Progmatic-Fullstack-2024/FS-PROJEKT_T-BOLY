import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const updateUser = async (id, userData) => {
  const user = prisma.user.findUnique({
    where: { id },
  });
  if (!user) throw new HttpError("User not found", 404);
  const updatedUser = await prisma.product.update({
    where: { id },
    data: userData,
  });
  return updatedUser;
};

export default { updateUser };

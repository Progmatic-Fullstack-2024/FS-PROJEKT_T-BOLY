import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getConnectionById = async (id) => {
  const connection = await prisma.categoryProduct.findUnique({
    where: { id },
  });
  if (!connection) {
    throw new HttpError("Connection not found", 404);
  }
  return connection;
};

const createProductCategoryConnection = async (connectionData) => {
  const newConnection = await prisma.categoryProduct.create({
    data: connectionData,
  });
  console.log("newConnectionData", newConnection);
  return newConnection;
};

const updateProductCategoryConnection = async (id, connectionData) => {
  const existedConnection = prisma.categoryProduct.findUnique({
    where: { id },
  });
  if (!existedConnection) throw new HttpError("Connection not found", 404);
  const updatedConnectiot = await prisma.categoryProduct.update({
    where: { id },
    data: connectionData,
  });
  return updatedConnectiot;
};

const destroyConnection = async (id) => {
  await getConnectionById(id);
  return prisma.categoryProduct.delete({
    where: { id },
  });
};

export default {
  getConnectionById,
  createProductCategoryConnection,
  updateProductCategoryConnection,
  destroyConnection,
};

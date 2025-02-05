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

const destroyConnection = async (productId) => {
  const connectionList = await prisma.categoryProduct.findMany({
    where: { productId },
  });

  const deletedConnections = await Promise.all(
    connectionList.map((connection) =>
      prisma.categoryProduct.delete({
        where: { id: connection.id },
      }),
    ),
  );
  return deletedConnections;
};

export default {
  getConnectionById,
  createProductCategoryConnection,
  updateProductCategoryConnection,
  destroyConnection,
};

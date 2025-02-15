-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "pictureUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adress" TEXT,
ADD COLUMN     "billingAdress" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;

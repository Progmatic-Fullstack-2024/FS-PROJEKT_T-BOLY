/*
  Warnings:

  - You are about to drop the column `adress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingAdress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `billingAdress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "adress",
DROP COLUMN "billingAdress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "billingAddress" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adress",
DROP COLUMN "billingAdress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "newsLetter" BOOLEAN NOT NULL DEFAULT false;

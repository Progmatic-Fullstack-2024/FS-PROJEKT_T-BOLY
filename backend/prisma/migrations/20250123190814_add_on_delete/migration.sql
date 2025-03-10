-- DropForeignKey
ALTER TABLE "CategoryProduct" DROP CONSTRAINT "CategoryProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryProduct" DROP CONSTRAINT "CategoryProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "CategoryProduct" ADD CONSTRAINT "CategoryProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProduct" ADD CONSTRAINT "CategoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

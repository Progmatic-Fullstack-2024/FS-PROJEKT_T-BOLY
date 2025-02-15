/*
  Warnings:

  - Added the required column `discount` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "discount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AWAITINGPAYMENT';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "longDescriptionEN" TEXT NOT NULL DEFAULT 'Bag stretch chase imaginary bugs rub face on everything behind the couch give attitude swat at dog intently stare at the same spot claw drapes need to chase tail, hide when guests come over attack feet make muffins lick butt leave dead animals as gifts destroy couch. Give attitude swat at dog flop over rub face on everything hide when guests come over intrigued by the shower chase imaginary bugs attack feet need to chase tail behind the couch make muffins intently sniff hand why must they do that, destroy couch bag stretch hopped up on goofballs leave dead animals as gifts intently stare at the same spot lick butt claw drapes hunt anything that moves hopped up on goofballs.S',
ADD COLUMN     "longDescriptionHU" TEXT;

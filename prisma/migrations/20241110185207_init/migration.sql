/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "mobileNumber" INTEGER NOT NULL,
    "otp" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_mobileNumber_key" ON "Seller"("mobileNumber");

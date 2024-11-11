-- CreateTable
CREATE TABLE "Buyer" (
    "id" SERIAL NOT NULL,
    "mobileNumber" INTEGER NOT NULL,
    "otp" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_mobileNumber_key" ON "Buyer"("mobileNumber");

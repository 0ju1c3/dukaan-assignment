-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "mobileNumber" INTEGER NOT NULL,
    "otp" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

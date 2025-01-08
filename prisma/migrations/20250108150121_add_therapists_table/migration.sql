-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'non_binary', 'prefer_not_to_say');

-- CreateTable
CREATE TABLE "therapists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "bio" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "languages" TEXT[],
    "specialization" TEXT[],
    "costPerSession" DECIMAL(10,2) NOT NULL,
    "sessionDuration" INTEGER NOT NULL,
    "offersFirstConsultation" BOOLEAN NOT NULL DEFAULT false,
    "lgbtqFriendly" BOOLEAN NOT NULL DEFAULT false,
    "profilePicture" TEXT,
    "profileVideo" TEXT,
    "qualificationsPdf" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "therapists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "therapists_userId_key" ON "therapists"("userId");

-- AddForeignKey
ALTER TABLE "therapists" ADD CONSTRAINT "therapists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

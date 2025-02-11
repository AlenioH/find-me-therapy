/*
  Warnings:

  - Added the required column `city` to the `therapists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `therapists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `therapists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `therapists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "therapists" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

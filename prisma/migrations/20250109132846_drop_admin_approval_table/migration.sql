/*
  Warnings:

  - You are about to drop the `AdminApproval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminApproval" DROP CONSTRAINT "AdminApproval_therapistId_fkey";

-- DropTable
DROP TABLE "AdminApproval";

-- CreateTable
CREATE TABLE "admin_approvals" (
    "id" SERIAL NOT NULL,
    "therapistId" INTEGER NOT NULL,
    "type" "ApprovalType" NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'pending',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_approvals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "admin_approvals" ADD CONSTRAINT "admin_approvals_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "therapists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

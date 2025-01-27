-- AlterTable
ALTER TABLE "therapists" ADD COLUMN     "news" TEXT,
ADD COLUMN     "newsApprovalStatus" "ApprovalStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "newsUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

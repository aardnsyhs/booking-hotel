-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "cancellationDate" TIMESTAMP(3),
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "refundAmount" INTEGER,
ADD COLUMN     "refundStatus" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'confirmed';

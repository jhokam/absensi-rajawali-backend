/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Desa` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Kelompok` table. All the data in the column will be lost.
  - You are about to drop the column `generus_id` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Hadir', 'Izin');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_generus_id_fkey";

-- DropIndex
DROP INDEX "User_generus_id_key";

-- AlterTable
ALTER TABLE "Desa" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Generus" ALTER COLUMN "alamat_tempat_tinggal" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "alamat_asal" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Kelompok" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "generus_id";

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presention" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "event_id" TEXT NOT NULL,
    "generus_id" TEXT NOT NULL,

    CONSTRAINT "Presention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presention_event_id_key" ON "Presention"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Presention_generus_id_key" ON "Presention"("generus_id");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presention" ADD CONSTRAINT "Presention_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presention" ADD CONSTRAINT "Presention_generus_id_fkey" FOREIGN KEY ("generus_id") REFERENCES "Generus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

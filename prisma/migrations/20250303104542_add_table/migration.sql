/*
  Warnings:

  - You are about to drop the column `password` on the `Remaja` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Remaja` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Remaja` table. All the data in the column will be lost.
  - Added the required column `kelompokId` to the `Remaja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Super Admin';

-- DropIndex
DROP INDEX "Remaja_username_key";

-- AlterTable
ALTER TABLE "Remaja" DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "username",
ADD COLUMN     "kelompokId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "remajaId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "desaId" INTEGER NOT NULL,

    CONSTRAINT "Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desa" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "Desa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_remajaId_key" ON "User"("remajaId");

-- CreateIndex
CREATE UNIQUE INDEX "Kelompok_nama_key" ON "Kelompok"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Desa_nama_key" ON "Desa"("nama");

-- AddForeignKey
ALTER TABLE "Remaja" ADD CONSTRAINT "Remaja_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_remajaId_fkey" FOREIGN KEY ("remajaId") REFERENCES "Remaja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelompok" ADD CONSTRAINT "Kelompok_desaId_fkey" FOREIGN KEY ("desaId") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

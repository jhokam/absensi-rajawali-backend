/*
  Warnings:

  - You are about to drop the column `desaId` on the `Kelompok` table. All the data in the column will be lost.
  - You are about to drop the column `remajaId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Remaja` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[generus_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `desa_id` to the `Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generus_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kelompok" DROP CONSTRAINT "Kelompok_desaId_fkey";

-- DropForeignKey
ALTER TABLE "Remaja" DROP CONSTRAINT "Remaja_kelompokId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_remajaId_fkey";

-- DropIndex
DROP INDEX "User_remajaId_key";

-- AlterTable
ALTER TABLE "Kelompok" DROP COLUMN "desaId",
ADD COLUMN     "desa_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "remajaId",
ADD COLUMN     "generus_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Remaja";

-- CreateTable
CREATE TABLE "Generus" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "tempat_lahir" VARCHAR(32),
    "tanggal_lahir" DATE NOT NULL,
    "jenjang" "Jenjang" NOT NULL,
    "nomer_whatsapp" VARCHAR(14),
    "pendidikan_terakhir" "PendidikanTerakhir" NOT NULL,
    "nama_orang_tua" VARCHAR(50),
    "nomer_whatsapp_orang_tua" VARCHAR(14),
    "sambung" "Sambung" NOT NULL DEFAULT 'Tidak Aktif',
    "alamat_tempat_tinggal" VARCHAR(100) NOT NULL,
    "keterangan" "Keterangan" NOT NULL,
    "alamat_asal" VARCHAR(100),
    "kelompok_id" INTEGER NOT NULL,

    CONSTRAINT "Generus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_generus_id_key" ON "User"("generus_id");

-- AddForeignKey
ALTER TABLE "Kelompok" ADD CONSTRAINT "Kelompok_desa_id_fkey" FOREIGN KEY ("desa_id") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generus" ADD CONSTRAINT "Generus_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_generus_id_fkey" FOREIGN KEY ("generus_id") REFERENCES "Generus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

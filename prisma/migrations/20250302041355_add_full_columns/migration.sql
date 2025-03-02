/*
  Warnings:

  - The values [Laki_Laki] on the enum `JenisKelamin` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pra_Remaja,Pra_Nikah] on the enum `Jenjang` will be removed. If these variants are still used in the database, this will fail.
  - The values [Tidak_Aktif] on the enum `Sambung` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `alamat` on the `Remaja` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Remaja` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Remaja` table. All the data in the column will be lost.
  - You are about to alter the column `nama` on the `Remaja` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `Remaja` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.

*/
-- CreateEnum
CREATE TYPE "PendidikanTerakhir" AS ENUM ('PAUD', 'TK', 'SD', 'SMP', 'SMA/SMK', 'D1-D3', 'S1/D4', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "Keterangan" AS ENUM ('Pendatang', 'Pribumi');

-- AlterEnum
BEGIN;
CREATE TYPE "JenisKelamin_new" AS ENUM ('Laki-Laki', 'Perempuan');
ALTER TABLE "Remaja" ALTER COLUMN "jenis_kelamin" TYPE "JenisKelamin_new" USING ("jenis_kelamin"::text::"JenisKelamin_new");
ALTER TYPE "JenisKelamin" RENAME TO "JenisKelamin_old";
ALTER TYPE "JenisKelamin_new" RENAME TO "JenisKelamin";
DROP TYPE "JenisKelamin_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Jenjang_new" AS ENUM ('Paud', 'Caberawit', 'Pra Remaja', 'Remaja', 'Pra Nikah');
ALTER TABLE "Remaja" ALTER COLUMN "jenjang" TYPE "Jenjang_new" USING ("jenjang"::text::"Jenjang_new");
ALTER TYPE "Jenjang" RENAME TO "Jenjang_old";
ALTER TYPE "Jenjang_new" RENAME TO "Jenjang";
DROP TYPE "Jenjang_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Sambung_new" AS ENUM ('Aktif', 'Tidak Aktif');
ALTER TABLE "Remaja" ALTER COLUMN "sambung" TYPE "Sambung_new" USING ("sambung"::text::"Sambung_new");
ALTER TYPE "Sambung" RENAME TO "Sambung_old";
ALTER TYPE "Sambung_new" RENAME TO "Sambung";
DROP TYPE "Sambung_old";
COMMIT;

-- AlterTable
ALTER TABLE "Remaja" DROP COLUMN "alamat",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "alamat_asal" VARCHAR(100),
ADD COLUMN     "alamat_tempat_tinggal" VARCHAR(100),
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "keterangan" "Keterangan",
ADD COLUMN     "nama_orang_tua" VARCHAR(50),
ADD COLUMN     "nomer_whatsapp" VARCHAR(14),
ADD COLUMN     "nomer_whatsapp_orang_tua" VARCHAR(14),
ADD COLUMN     "pendidikan_terakhir" "PendidikanTerakhir",
ADD COLUMN     "tanggal_lahir" DATE,
ADD COLUMN     "tempat_lahir" VARCHAR(32),
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "nama" DROP NOT NULL,
ALTER COLUMN "nama" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "jenis_kelamin" DROP NOT NULL,
ALTER COLUMN "jenjang" DROP NOT NULL,
ALTER COLUMN "sambung" DROP NOT NULL,
ALTER COLUMN "sambung" SET DEFAULT 'Tidak Aktif',
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'User',
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128);

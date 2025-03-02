/*
  Warnings:

  - Made the column `nama` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jenis_kelamin` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jenjang` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sambung` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alamat_tempat_tinggal` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keterangan` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pendidikan_terakhir` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggal_lahir` on table `Remaja` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Remaja` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Remaja" ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "jenis_kelamin" SET NOT NULL,
ALTER COLUMN "jenjang" SET NOT NULL,
ALTER COLUMN "sambung" SET NOT NULL,
ALTER COLUMN "alamat_tempat_tinggal" SET NOT NULL,
ALTER COLUMN "keterangan" SET NOT NULL,
ALTER COLUMN "pendidikan_terakhir" SET NOT NULL,
ALTER COLUMN "tanggal_lahir" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

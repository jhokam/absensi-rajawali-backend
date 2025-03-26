-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('Laki-Laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Jenjang" AS ENUM ('Paud', 'Caberawit', 'Pra Remaja', 'Remaja', 'Pra Nikah');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Super Admin', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "Sambung" AS ENUM ('Aktif', 'Tidak Aktif');

-- CreateEnum
CREATE TYPE "PendidikanTerakhir" AS ENUM ('PAUD', 'TK', 'SD', 'SMP', 'SMA/SMK', 'D1-D3', 'S1/D4', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "Keterangan" AS ENUM ('Pendatang', 'Pribumi');

-- CreateTable
CREATE TABLE "Desa" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "Desa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "desa_id" INTEGER NOT NULL,

    CONSTRAINT "Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generus" (
    "id" TEXT NOT NULL,
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
    "kelompok_id" TEXT NOT NULL,

    CONSTRAINT "Generus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "generus_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Desa_nama_key" ON "Desa"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Kelompok_nama_key" ON "Kelompok"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Kelompok_code_key" ON "Kelompok"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Generus_kelompok_id_key" ON "Generus"("kelompok_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_generus_id_key" ON "User"("generus_id");

-- AddForeignKey
ALTER TABLE "Kelompok" ADD CONSTRAINT "Kelompok_desa_id_fkey" FOREIGN KEY ("desa_id") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generus" ADD CONSTRAINT "Generus_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_generus_id_fkey" FOREIGN KEY ("generus_id") REFERENCES "Generus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "Jenjang" AS ENUM ('PAUD', 'CABERAWIT', 'PRA_REMAJA', 'REMAJA', 'PRA_NIKAH');

-- CreateEnum
CREATE TYPE "PendidikanTerakhir" AS ENUM ('PAUD', 'TK', 'SD', 'SMP', 'SMA_SMK', 'D1_D3', 'S1_D4', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Remaja" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "tempat_lahir" TEXT,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenjang" "Jenjang" NOT NULL,
    "nomer_whatsapp" INTEGER NOT NULL,
    "pendidikan_terakhir" "PendidikanTerakhir",
    "nama_orang_tua" TEXT,
    "nomer_whatsapp_orang_tua" INTEGER,
    "sambung" BOOLEAN NOT NULL,
    "alamat_tempat_tinggal" TEXT,
    "keterangan" BOOLEAN NOT NULL,
    "alamat_asal" TEXT,

    CONSTRAINT "Remaja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

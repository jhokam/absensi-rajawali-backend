-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('Laki_Laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Jenjang" AS ENUM ('Paud', 'Caberawit', 'Pra_Remaja', 'Remaja', 'Pra_Nikah');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "Sambung" AS ENUM ('Aktif', 'Tidak_Aktif');

-- CreateTable
CREATE TABLE "Remaja" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "jenjang" "Jenjang" NOT NULL,
    "alamat" TEXT NOT NULL,
    "sambung" "Sambung" NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Remaja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Remaja_username_key" ON "Remaja"("username");

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "Jenjang" AS ENUM ('PAUD', 'CABERAWIT', 'PRA_REMAJA', 'REMAJA', 'PRA_NIKAH');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

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
    "sambung" BOOLEAN NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Remaja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Remaja_username_key" ON "Remaja"("username");

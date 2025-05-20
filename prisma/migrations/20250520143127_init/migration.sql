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

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Hadir', 'Izin');

-- CreateTable
CREATE TABLE "Desa" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "Desa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" VARCHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" VARCHAR(50) NOT NULL,
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
    "alamat_tempat_tinggal" VARCHAR(255) NOT NULL,
    "keterangan" "Keterangan" NOT NULL,
    "alamat_asal" VARCHAR(255),
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
    "description" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presence" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "description" TEXT,
    "event_id" TEXT NOT NULL,
    "generus_id" TEXT NOT NULL,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Desa_nama_key" ON "Desa"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Kelompok_nama_key" ON "Kelompok"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Generus_kelompok_id_key" ON "Generus"("kelompok_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");

-- AddForeignKey
ALTER TABLE "Kelompok" ADD CONSTRAINT "Kelompok_desa_id_fkey" FOREIGN KEY ("desa_id") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generus" ADD CONSTRAINT "Generus_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_generus_id_fkey" FOREIGN KEY ("generus_id") REFERENCES "Generus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

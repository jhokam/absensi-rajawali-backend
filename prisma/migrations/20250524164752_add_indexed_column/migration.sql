-- CreateIndex
CREATE INDEX "Desa_nama_idx" ON "Desa"("nama");

-- CreateIndex
CREATE INDEX "Event_title_idx" ON "Event"("title");

-- CreateIndex
CREATE INDEX "Generus_nama_jenis_kelamin_jenjang_pendidikan_terakhir_samb_idx" ON "Generus"("nama", "jenis_kelamin", "jenjang", "pendidikan_terakhir", "sambung", "keterangan");

-- CreateIndex
CREATE INDEX "Kelompok_nama_idx" ON "Kelompok"("nama");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

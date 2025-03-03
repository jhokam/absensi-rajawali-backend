import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Clean database
	await prisma.remaja.deleteMany();
	await prisma.desa.deleteMany();
	await prisma.user.deleteMany();
	await prisma.kelompok.deleteMany();

	// Create Desa
	await prisma.desa.create({
		data: {
			id: 1,
			nama: "Kanguru",
		},
	});

	// Create Kelompok
	await prisma.kelompok.create({
		data: {
			nama: "Kanguru",
			desaId: 1,
		},
	});

	// Create Remaja
	await prisma.remaja.create({
		data: {
			nama: "Admin Rajawali",
			jenis_kelamin: "Laki_Laki",
			tempat_lahir: "Jakarta",
			tanggal_lahir: new Date("1990-01-01"),
			jenjang: "Remaja",
			nomer_whatsapp: "081234567890",
			sambung: "Aktif",
			alamat_tempat_tinggal: "Jl. Admin Rajawali No. 1",
			keterangan: "Pendatang",
			pendidikan_terakhir: "SMA_SMK",
			kelompokId: 1,
		},
	});

	// Create User
	await prisma.user.create({
		data: {
			username: "admin",
			password: "admin",
			role: "Admin",
			remajaId: 1,
		},
	});
}

console.log("Database has been seeded");

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

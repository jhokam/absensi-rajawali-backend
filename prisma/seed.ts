import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Clean database
	await prisma.generus.deleteMany();
	await prisma.desa.deleteMany();
	await prisma.user.deleteMany();
	await prisma.kelompok.deleteMany();

	// Create Desa
	await prisma.desa.createMany({
		data: [
			{
				nama: "Sendang Mulyo",
			},
			{
				nama: "Kokosan",
			},
			{
				nama: "Kanguru",
			},
			{
				nama: "Graha Mukti",
			},
		],
	});

	// Create Kelompok
	await prisma.kelompok.createMany({
		data: [
			{
				nama: "Sendang Mulyo",
				desa_id: 1,
			},
			{
				nama: "Sambiroto",
				desa_id: 1,
			},
			{
				nama: "Fatmawati",
				desa_id: 1,
			},
			{
				nama: "Zebra",
				desa_id: 1,
			},
			{
				nama: "Kokosan",
				desa_id: 2,
			},
			{
				nama: "Sendang Guwo",
				desa_id: 2,
			},
			{
				nama: "Pancur Sari",
				desa_id: 2,
			},
			{
				nama: "Lamper Tengah",
				desa_id: 2,
			},
			{
				nama: "Kanguru",
				desa_id: 3,
			},
			{
				nama: "Karang Anyar",
				desa_id: 3,
			},
			{
				nama: "Pandansari",
				desa_id: 3,
			},
			{
				nama: "Sambirejo",
				desa_id: 3,
			},
			{
				nama: "Graha Mukti",
				desa_id: 4,
			},
			{
				nama: "Menjangan",
				desa_id: 4,
			},
			{
				nama: "Ganesha",
				desa_id: 4,
			},
			{
				nama: "Banget Ayu",
				desa_id: 4,
			},
			{
				nama: "Genuk Indah",
				desa_id: 4,
			},
			{
				nama: "Muktiharjo",
				desa_id: 4,
			},
			{
				nama: "Syuhada",
				desa_id: 4,
			},
		],
	});

	// Create Generus
	await prisma.generus.create({
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
			kelompok_id: 9,
		},
	});

	// Create User
	await prisma.user.create({
		data: {
			username: "admin",
			password: "admin",
			role: "Admin",
			generus_id: 1,
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

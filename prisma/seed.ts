import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
	// Clean database
	await prisma.user.deleteMany();
	await prisma.generus.deleteMany();
	await prisma.kelompok.deleteMany();
	await prisma.desa.deleteMany();

	// Create Desa
	await prisma.desa.createMany({
		data: [
			{
				id: 1,
				nama: "Sendang Mulyo",
			},
			{
				id: 2,
				nama: "Kokosan",
			},
			{
				id: 3,
				nama: "Kanguru",
			},
			{
				id: 4,
				nama: "Graha Mukti",
			},
		],
	});

	// Create Kelompok
	const kelompok = await prisma.kelompok.create({
		data: {
			id: uuidv4(),
			nama: "Sendang Mulyo",
			desa_id: 1,
			code: "SML",
		},
	});

	await prisma.kelompok.createMany({
		data: [
			{
				nama: "Sambiroto",
				desa_id: 1,
				code: "SRT",
			},
			{
				nama: "Fatmawati",
				desa_id: 1,
				code: "FTM",
			},
			{
				nama: "Zebra",
				desa_id: 1,
				code: "ZBR",
			},
			{
				nama: "Kokosan",
				desa_id: 2,
				code: "KKS",
			},
			{
				nama: "Sendang Guwo",
				desa_id: 2,
				code: "SGW",
			},
			{
				nama: "Pancur Sari",
				desa_id: 2,
				code: "PSR",
			},
			{
				nama: "Lamper Tengah",
				desa_id: 2,
				code: "LMP",
			},
			{
				nama: "Kanguru",
				desa_id: 3,
				code: "KGR",
			},
			{
				nama: "Karang Anyar",
				desa_id: 3,
				code: "KRA",
			},
			{
				nama: "Pandansari",
				desa_id: 3,
				code: "PDS",
			},
			{
				nama: "Sambirejo",
				desa_id: 3,
				code: "SRJ",
			},
			{
				nama: "Menjangan",
				desa_id: 4,
				code: "MJG",
			},
			{
				nama: "Graha Mukti",
				desa_id: 4,
				code: "GRH",
			},
			{
				nama: "Ganesha",
				desa_id: 4,
				code: "GNS",
			},
			{
				nama: "Banget Ayu",
				desa_id: 4,
				code: "BGA",
			},
			{
				nama: "Genuk Indah",
				desa_id: 4,
				code: "BNK",
			},
			{
				nama: "Muktiharjo",
				desa_id: 4,
				code: "MKT",
			},
			{
				nama: "Syuhada",
				desa_id: 4,
				code: "SHD",
			},
		],
	});

	// Create Generus
	const generus = await prisma.generus.create({
		data: {
			id: uuidv4(),
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
			kelompok_id: kelompok.id,
		},
	});

	// Create User
	await prisma.user.create({
		data: {
			username: "admin",
			password: await hash(process.env.USER_PASSWORD || "default_password"),
			role: "Admin",
			generus_id: generus.id,
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

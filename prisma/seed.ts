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
	const desa = await prisma.desa.create({
		data: {
			id: 1,
			nama: "Sendang Mulyo",
		},
	});

	await prisma.desa.createMany({
		data: [
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
				id: uuidv4(),
				nama: "Sambiroto",
				desa_id: 1,
				code: "SRT",
			},
			{
				id: uuidv4(),
				nama: "Fatmawati",
				desa_id: 1,
				code: "FTM",
			},
			{
				id: uuidv4(),
				nama: "Zebra",
				desa_id: 1,
				code: "ZBR",
			},
			{
				id: uuidv4(),
				nama: "Kokosan",
				desa_id: 2,
				code: "KKS",
			},
			{
				id: uuidv4(),
				nama: "Sendang Guwo",
				desa_id: 2,
				code: "SGW",
			},
			{
				id: uuidv4(),
				nama: "Pancur Sari",
				desa_id: 2,
				code: "PSR",
			},
			{
				id: uuidv4(),
				nama: "Lamper Tengah",
				desa_id: 2,
				code: "LMP",
			},
			{
				id: uuidv4(),
				nama: "Kanguru",
				desa_id: 3,
				code: "KGR",
			},
			{
				id: uuidv4(),
				nama: "Karang Anyar",
				desa_id: 3,
				code: "KRA",
			},
			{
				id: uuidv4(),
				nama: "Pandansari",
				desa_id: 3,
				code: "PDS",
			},
			{
				id: uuidv4(),
				nama: "Sambirejo",
				desa_id: 3,
				code: "SRJ",
			},
			{
				id: uuidv4(),
				nama: "Menjangan",
				desa_id: 4,
				code: "MJG",
			},
			{
				id: uuidv4(),
				nama: "Graha Mukti",
				desa_id: 4,
				code: "GRH",
			},
			{
				id: uuidv4(),
				nama: "Ganesha",
				desa_id: 4,
				code: "GNS",
			},
			{
				id: uuidv4(),
				nama: "Banget Ayu",
				desa_id: 4,
				code: "BGA",
			},
			{
				id: uuidv4(),
				nama: "Genuk Indah",
				desa_id: 4,
				code: "BNK",
			},
			{
				id: uuidv4(),
				nama: "Muktiharjo",
				desa_id: 4,
				code: "MKT",
			},
			{
				id: uuidv4(),
				nama: "Syuhada",
				desa_id: 4,
				code: "SHD",
			},
		],
	});

	// Create Generus
	const generus = await prisma.generus.create({
		data: {
			id: `${desa.id}-${kelompok.code}-0000`,
			nama: "Admin Rajawali",
			jenis_kelamin: "Laki_Laki",
			tempat_lahir: "Jakarta",
			tanggal_lahir: new Date("1990-01-01"),
			jenjang: "Remaja",
			nomer_whatsapp: "081234567890",
			pendidikan_terakhir: "SMA_SMK",
			nama_orang_tua: "Orang Tua Admin Rajawali",
			nomer_whatsapp_orang_tua: "081234567891",
			sambung: "Aktif",
			alamat_tempat_tinggal: "Jl. Admin Rajawali No. 1",
			keterangan: "Pendatang",
			alamat_asal: "Jl. Admin Rajawali No. 2",
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

import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

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
	const user = await prisma.user.create({
		data: {
			username: "admin",
			password: await hash(process.env.USER_PASSWORD || "default_password"),
			role: "Admin",
		},
	});

	// Create Event
	const event = await prisma.event.create({
		data: {
			title: "muda-mudi November 2006",
			description: "muda-mudi November 2006",
			start_date: new Date("2021-01-01"),
			end_date: new Date("2021-01-01"),
			location: "Jakarta",
		},
	});

	await prisma.presention.create({
		data: {
			status: "Hadir",
			event_id: event.id,
			generus_id: generus.id,
		},
	});

	await prisma.log.create({
		data: {
			description: "Berhasil login",
			event: "Login",
			user_id: user.id,
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

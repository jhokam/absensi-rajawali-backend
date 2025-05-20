import { hash } from "argon2";
import { PrismaClient } from "../src/generated/client";
import "dotenv/config";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

async function main() {
	console.info("Seeding database...");
	await prisma.log.deleteMany();
	await prisma.user.deleteMany();
	await prisma.presence.deleteMany();
	await prisma.event.deleteMany();
	await prisma.generus.deleteMany();
	await prisma.kelompok.deleteMany();
	await prisma.desa.deleteMany();

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

	const kelompok = await prisma.kelompok.create({
		data: {
			id: "SML",
			nama: "Sendang Mulyo",
			desa_id: 1,
		},
	});

	await prisma.kelompok.createMany({
		data: [
			{
				id: "SRT",
				nama: "Sambiroto",
				desa_id: 1,
			},
			{
				id: "FTM",
				nama: "Fatmawati",
				desa_id: 1,
			},
			{
				id: "ZBR",
				nama: "Zebra",
				desa_id: 1,
			},
			{
				id: "KKS",
				nama: "Kokosan",
				desa_id: 2,
			},
			{
				id: "SGW",
				nama: "Sendang Guwo",
				desa_id: 2,
			},
			{
				id: "PSR",
				nama: "Pancur Sari",
				desa_id: 2,
			},
			{
				id: "LMP",
				nama: "Lamper Tengah",
				desa_id: 2,
			},
			{
				id: "KGR",
				nama: "Kanguru",
				desa_id: 3,
			},
			{
				id: "KRA",
				nama: "Karang Anyar",
				desa_id: 3,
			},
			{
				id: "PDS",
				nama: "Pandansari",
				desa_id: 3,
			},
			{
				id: "SRJ",
				nama: "Sambirejo",
				desa_id: 3,
			},
			{
				id: "MJG",
				nama: "Menjangan",
				desa_id: 4,
			},
			{
				id: "GRH",
				nama: "Graha Mukti",
				desa_id: 4,
			},
			{
				id: "GNS",
				nama: "Ganesha",
				desa_id: 4,
			},
			{
				id: "BGA",
				nama: "Banget Ayu",
				desa_id: 4,
			},
			{
				id: "BNK",
				nama: "Genuk Indah",
				desa_id: 4,
			},
			{
				id: "MKT",
				nama: "Muktiharjo",
				desa_id: 4,
			},
			{
				id: "SHD",
				nama: "Syuhada",
				desa_id: 4,
			},
		],
	});

	const generus = await prisma.generus.create({
		data: {
			id: `${desa.id}-${kelompok.id}-0000`,
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

	const user = await prisma.user.create({
		data: {
			username: "admin",
			password: await hash(process.env.USER_PASSWORD || "default_password"),
			role: "Admin",
		},
	});

	const event = await prisma.event.create({
		data: {
			title: "muda-mudi November 2006",
			description: "muda-mudi November 2006",
			start_date: new Date("2021-01-01"),
			end_date: new Date("2021-01-01"),
			location: "Jakarta",
		},
	});

	await prisma.presence.create({
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
	console.log("Database has been seeded");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

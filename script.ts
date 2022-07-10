import {Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient( /* {log: ["query"]} */);

async function main() {
	// await deleteAllUser();
	await getAllUser();
	// await createUser(
	// 	{
	// 		name: "Danh ne",
	// 		age: 24,
	// 		blob: Buffer.from("hello"),
	// 		email: "thanhdanh27600+4@gmail.com",
	// 		userPreference: {
	// 			create: {
	// 				emailUpdates: true,
	// 			},
	// 		},
	// 	},
	// 	true
	// );
	await findUnique({
		where: {
			age_name: {
				age: 24,
				name: "Danh ne",
			},
		},
	});
}

async function getAllUser() {
	const user = await prisma.user.findMany();
	console.log(user);
}

async function createUser(
	data: Prisma.UserCreateInput,
	withPreference: boolean = false
) {
	const user = await prisma.user.create({
		data,
		// include: {
		// 	userPreference: withPreference,
		// },
		select: {
			name: true,
			userPreference: true,
		},
	});
	console.log("Create new user", user);
}

async function deleteAllUser() {
	const rs = await prisma.user.deleteMany();
	console.log("Deleted all user", rs);
}

async function findUnique(query: Prisma.UserFindUniqueArgs) {
	const user = await prisma.user.findUnique(query);
	console.log("file: script.ts ~ line 52 ~ findUnique ~ user", user);
}

main()
	.catch((e) => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

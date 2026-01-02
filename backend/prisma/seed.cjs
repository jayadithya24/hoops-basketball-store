const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding products...");

  await prisma.product.createMany({
    data: [
      {
        name: "Pro Elite",
        description: "Official game ball for professional leagues.",
        price: 149,
        category: "Professional",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07c",
      },
      {
        name: "Pro Training",
        description: "Engineered for intensive practice sessions.",
        price: 99,
        category: "Training",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      },
      {
        name: "Outdoor Grip",
        description: "Built for outdoor courts with improved durability.",
        price: 79,
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding done!");
}

main()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });

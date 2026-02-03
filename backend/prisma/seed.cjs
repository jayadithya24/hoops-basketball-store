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
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf"
      },
      {
        name: "Pro Training",
        description: "Engineered for intensive practice sessions.",
        price: 99,
        category: "Training",
        image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04"
      },
      {
        name: "Outdoor Grip",
        description: "Built for outdoor courts with improved durability.",
        price: 79,
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d"
      },
      {
        name: "Street King",
        description: "Perfect for street basketball and rough surfaces.",
        price: 69,
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2"
      },
      {
        name: "Elite Match",
        description: "Competition-grade ball with superior grip and balance.",
        price: 139,
        category: "Professional",
        image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0"
      },
      {
        name: "Court Master",
        description: "Designed for indoor courts with excellent control.",
        price: 119,
        category: "Indoor",
        image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8"
      },
      {
        name: "Rookie Start",
        description: "Lightweight basketball ideal for beginners.",
        price: 49,
        category: "Beginner",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
      },
      {
        name: "All-Rounder",
        description: "Versatile ball suitable for indoor and outdoor play.",
        price: 89,
        category: "Hybrid",
        image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a"
      },
      {
        name: "Power Dunk",
        description: "Heavy-duty ball built for aggressive play styles.",
        price: 109,
        category: "Training",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc"
      },
      {
        name: "Junior Hoop",
        description: "Smaller size ball made for kids and young players.",
        price: 39,
        category: "Kids",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30"
      },
      {
        name: "Night Court",
        description: "High-visibility design for low-light outdoor games.",
        price: 85,
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43"
      },
      {
        name: "Precision Shot",
        description: "Enhanced surface texture for accurate shooting.",
        price: 129,
        category: "Professional",
        image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402"
      }
    ]
  });

  console.log("Seeding done!");
}

main()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });

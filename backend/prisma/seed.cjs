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
      image: "..."
    },
    {
      name: "Pro Training",
      description: "Engineered for intensive practice sessions.",
      price: 99,
      category: "Training",
      image: "..."
    },
    {
      name: "Outdoor Grip",
      description: "Built for outdoor courts with improved durability.",
      price: 79,
      category: "Outdoor",
      image: "..."
    },
    {
      name: "Street King",
      description: "Perfect for street basketball and rough surfaces.",
      price: 69,
      category: "Outdoor",
      image: "..."
    },
    {
      name: "Elite Match",
      description: "Competition-grade ball with superior grip and balance.",
      price: 139,
      category: "Professional",
      image: "..."
    },
    {
      name: "Court Master",
      description: "Designed for indoor courts with excellent control.",
      price: 119,
      category: "Indoor",
      image: "..."
    },
    {
      name: "Rookie Start",
      description: "Lightweight basketball ideal for beginners.",
      price: 49,
      category: "Beginner",
      image: "..."
    },
    {
      name: "All-Rounder",
      description: "Versatile ball suitable for indoor and outdoor play.",
      price: 89,
      category: "Hybrid",
      image: "..."
    },
    {
      name: "Power Dunk",
      description: "Heavy-duty ball built for aggressive play styles.",
      price: 109,
      category: "Training",
      image: "..."
    },
    {
      name: "Junior Hoop",
      description: "Smaller size ball made for kids and young players.",
      price: 39,
      category: "Kids",
      image: "..."
    },
    {
      name: "Night Court",
      description: "High-visibility design for low-light outdoor games.",
      price: 85,
      category: "Outdoor",
      image: "..."
    },
    {
      name: "Precision Shot",
      description: "Enhanced surface texture for accurate shooting.",
      price: 129,
      category: "Professional",
      image: "..."
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.category.createMany({
    data: [
      {
        name: "Board Games",
        description: "Various types of board games for all ages.",
        pictureUrl: "https://example.com/images/boardgames.jpg",
      },
      {
        name: "Card Games",
        description: "Card games for family or friendly gatherings.",
        pictureUrl: "https://example.com/images/cardgames.jpg",
      },
      {
        name: "Logic Games",
        description: "Educational logic games for kids and adults.",
        pictureUrl: "https://example.com/images/logicgames.jpg",
      },
      {
        name: "Kids Games",
        description: "Games for younger children.",
        pictureUrl: "https://example.com/images/kidsgames.jpg",
      },
      {
        name: "Family Games",
        description: "Fun games for family evenings.",
        pictureUrl: "https://example.com/images/familygames.jpg",
      },
    ],
  });

  const products = [
    await prisma.product.create({
      data: {
        name: "Monopoly",
        description: "A classic property trading game.",
        price: 12000,
        pictureUrl: "https://example.com/images/monopoly.jpg",
        quantity: 50,
        rating: 4.5,
        ageRecommendationMin: 8,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "UNO",
        description: "A fast and fun card game.",
        price: 3000,
        pictureUrl: "https://example.com/images/uno.jpg",
        quantity: 100,
        rating: 4.8,
        ageRecommendationMin: 7,
        playersNumberMin: 2,
        playersNumberMax: 10,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Scrabble",
        description: "A word game for creative minds.",
        price: 8000,
        pictureUrl: "https://example.com/images/scrabble.jpg",
        quantity: 40,
        rating: 4.7,
        ageRecommendationMin: 10,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Jenga",
        description: "A balancing skill game.",
        price: 6000,
        pictureUrl: "https://example.com/images/jenga.jpg",
        quantity: 60,
        rating: 4.6,
        ageRecommendationMin: 6,
        playersNumberMin: 1,
        playersNumberMax: 8,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Pandemic",
        description: "A cooperative strategy game.",
        price: 14000,
        pictureUrl: "https://example.com/images/pandemic.jpg",
        quantity: 30,
        rating: 4.9,
        ageRecommendationMin: 13,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Catan",
        description: "A popular strategy game with settlers.",
        price: 15000,
        pictureUrl: "https://example.com/images/catan.jpg",
        quantity: 20,
        rating: 4.9,
        ageRecommendationMin: 10,
        playersNumberMin: 3,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Azul",
        description: "A creative tile-laying game.",
        price: 10000,
        pictureUrl: "https://example.com/images/azul.jpg",
        quantity: 25,
        rating: 4.7,
        ageRecommendationMin: 8,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Ticket to Ride",
        description: "A popular train board game.",
        price: 13000,
        pictureUrl: "https://example.com/images/ticket_to_ride.jpg",
        quantity: 30,
        rating: 4.8,
        ageRecommendationMin: 8,
        playersNumberMin: 2,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Carcassonne",
        description: "A medieval city-building game.",
        price: 11000,
        pictureUrl: "https://example.com/images/carcassonne.jpg",
        quantity: 35,
        rating: 4.6,
        ageRecommendationMin: 8,
        playersNumberMin: 2,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Dobble",
        description: "A fast reflex card game.",
        price: 4000,
        pictureUrl: "https://example.com/images/dobble.jpg",
        quantity: 80,
        rating: 4.5,
        ageRecommendationMin: 6,
        playersNumberMin: 2,
        playersNumberMax: 8,
      },
    }),
  ];

  const users = [
    await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        passwordHash: "hashedpassword1",
        username: "johnsmith",
        birthDate: new Date("1990-05-15"),
        adress: "123 Main St, New York",
        billingAdress: "123 Main St, New York",
        profilePictureUrl: "https://example.com/images/john.jpg",
        role: "ADMIN",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        passwordHash: "hashedpassword2",
        username: "janedoe",
        birthDate: new Date("1988-09-10"),
        adress: "456 Elm St, Los Angeles",
        billingAdress: "456 Elm St, Los Angeles",
        profilePictureUrl: "https://example.com/images/jane.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@example.com",
        passwordHash: "hashedpassword3",
        username: "mikejohnson",
        birthDate: new Date("1985-11-20"),
        adress: "789 Pine St, Chicago",
        billingAdress: "789 Pine St, Chicago",
        profilePictureUrl: "https://example.com/images/mike.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Emily",
        lastName: "Clark",
        email: "emily.clark@example.com",
        passwordHash: "hashedpassword4",
        username: "emilyclark",
        birthDate: new Date("1992-06-15"),
        adress: "101 Maple Ave, San Francisco",
        billingAdress: "101 Maple Ave, San Francisco",
        profilePictureUrl: "https://example.com/images/emily.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@example.com",
        passwordHash: "hashedpassword5",
        username: "davidbrown",
        birthDate: new Date("1990-03-30"),
        adress: "202 Oak St, Miami",
        billingAdress: "202 Oak St, Miami",
        profilePictureUrl: "https://example.com/images/david.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Sophia",
        lastName: "Taylor",
        email: "sophia.taylor@example.com",
        passwordHash: "hashedpassword6",
        username: "sophiataylor",
        birthDate: new Date("1995-01-10"),
        adress: "303 Birch Rd, Boston",
        billingAdress: "303 Birch Rd, Boston",
        profilePictureUrl: "https://example.com/images/sophia.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "James",
        lastName: "Lee",
        email: "james.lee@example.com",
        passwordHash: "hashedpassword7",
        username: "jameslee",
        birthDate: new Date("1983-07-05"),
        adress: "404 Cedar Blvd, Seattle",
        billingAdress: "404 Cedar Blvd, Seattle",
        profilePictureUrl: "https://example.com/images/james.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Olivia",
        lastName: "Wilson",
        email: "olivia.wilson@example.com",
        passwordHash: "hashedpassword8",
        username: "oliviawilson",
        birthDate: new Date("1993-08-22"),
        adress: "505 Spruce Ln, Austin",
        billingAdress: "505 Spruce Ln, Austin",
        profilePictureUrl: "https://example.com/images/olivia.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Liam",
        lastName: "Martinez",
        email: "liam.martinez@example.com",
        passwordHash: "hashedpassword9",
        username: "liammartinez",
        birthDate: new Date("1991-12-12"),
        adress: "606 Willow St, Denver",
        billingAdress: "606 Willow St, Denver",
        profilePictureUrl: "https://example.com/images/liam.jpg",
        role: "USER",
      },
    }),
    await prisma.user.create({
      data: {
        firstName: "Charlotte",
        lastName: "Garcia",
        email: "charlotte.garcia@example.com",
        passwordHash: "hashedpassword10",
        username: "charlottegarcia",
        birthDate: new Date("1994-05-25"),
        adress: "707 Aspen Ave, Houston",
        billingAdress: "707 Aspen Ave, Houston",
        profilePictureUrl: "https://example.com/images/charlotte.jpg",
        role: "USER",
      },
    }),
  ];
  console.log("Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.category.createMany({
    data: [
      {
        name: "Family Games",
        description:
          "Family board games are tabletop games designed for multiple players, typically offering simple rules and engaging gameplay that appeal to both children and adults. These games encourage interaction, strategy, and fun, making them perfect for family gatherings and bonding moments.",
        pictureUrl: "https://example.com/images/boardgames.jpg",
      },
      {
        name: "Card Games",
        description:
          "Card games are games played with a standard deck of cards or specialized card sets, often involving strategy, skill, and luck. Players typically compete to achieve specific objectives, such as forming certain hands, scoring points, or outsmarting opponents. Card games are versatile and can be played casually or competitively.",
        pictureUrl: "https://example.com/images/cardgames.jpg",
      },
      {
        name: "Logic Games",
        description:
          "Logic board games focus on strategy, critical thinking, and problem-solving. Players must use their reasoning skills to make decisions, often requiring planning ahead and anticipating opponents' moves. ",
        pictureUrl: "https://example.com/images/logicgames.jpg",
      },
      {
        name: "Kid Games",
        description:
          "Kids board games are designed with simple rules, colorful designs, and fun themes to engage young players. These games are easy to understand and often focus on basic skills like counting, matching, memory, and cooperation.",
        pictureUrl: "https://example.com/images/kidsgames.jpg",
      },
      {
        name: "Party Games",
        description:
          "Party board games are designed to be fast-paced, engaging, and fun for large groups, often focusing on humor, creativity, or teamwork. These games are perfect for social gatherings and encourage interaction, making them ideal for breaking the ice or keeping the energy high. ",
        pictureUrl: "https://example.com/images/familygames.jpg",
      },
      {
        name: "Strategy Games",
        description:
          "Strategy board games require players to plan, make thoughtful decisions, and use tactics to achieve a goal or outsmart opponents. These games often involve resource management, positioning, and long-term planning. Players must think ahead, adapt to changing circumstances, and anticipate others' moves.",
        pictureUrl: "https://example.com/images/familygames.jpg",
      },
      {
        name: "Lego",
        description:
          "LEGO is a popular construction toy brand known for its interlocking plastic bricks that allow users to build a wide variety of structures, vehicles, and characters. With sets designed for all ages, LEGO encourages creativity, problem-solving, and imagination. The brand also offers themed sets based on movies, cities, and fantasy worlds, making it a versatile and engaging activity for both children and adults.",
        pictureUrl: "https://example.com/images/familygames.jpg",
      },
      {
        name: "Puzzle",
        description:
          "A puzzle is a game or activity that challenges the mind by requiring players to solve a problem or complete a task, often through pattern recognition, logic, or spatial reasoning. Puzzles come in various forms, including jigsaw puzzles, crosswords, and logic puzzles. They are designed to stimulate cognitive abilities and provide a sense of accomplishment once completed. Puzzles can be enjoyed solo or with others and vary in difficulty levels.",
        pictureUrl: "https://example.com/images/familygames.jpg",
      },
    ],
  });

  const products = [
    await prisma.product.create({
      data: {
        name: "Monopoly",
        description:
          "A classic real-estate trading game where players buy, sell, and trade properties to bankrupt their opponents.",
        price: 19.99,
        pictureUrl:
          "https://www.hasbro.com/common/productimages/en_US/7EABAF9750569047F5778F4663C79E75/ee616120d6a46a0dc71d39ce6857290414129b14.jpg",
        quantity: 100,
        rating: 4.5,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Scrabble",
        description:
          "A word game where players use letter tiles to create words on a game board, scoring points based on letter values.",
        price: 15.99,
        pictureUrl:
          "https://s3.amazonaws.com/mindgamesandtoys.com/wp-content/uploads/2021/09/1028-1.jpg",
        quantity: 120,
        rating: 4.7,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Catan",
        description:
          "A resource management game where players build settlements, roads, and cities to accumulate points and become the dominant force on the island.",
        price: 39.99,
        pictureUrl:
          "https://catanshop.com/images/thumbs/0001795_catan-board-game-base-game-5th-edition_600.jpeg",
        quantity: 80,
        rating: 4.8,
        ageRecommendationMin: 10,
        ageRecommendationMax: 99,
        playersNumberMin: 3,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Uno",
        description:
          "A fast-paced card game where players match colors and numbers to get rid of all their cards first, using special action cards along the way.",
        price: 8.99,
        pictureUrl:
          "https://www.hauntedgamecafe.com/cdn/shop/files/uno-card-game-board-games-300.webp?v=1710029839",
        quantity: 150,
        rating: 4.5,
        ageRecommendationMin: 7,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 10,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Risk",
        description:
          "A strategic game of global domination where players use armies to take over territories and continents, battling for world control.",
        price: 19.99,
        pictureUrl:
          "https://target.scene7.com/is/image/Target/GUEST_1811d24c-99fa-4bc9-8e04-cd884c68fdd2?wid=488&hei=488&fmt=pjpeg",
        quantity: 70,
        rating: 4.4,
        ageRecommendationMin: 10,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Jenga",
        description:
          "A fun and nerve-wracking game where players take turns removing wooden blocks from a tower and stacking them on top, trying not to make the tower collapse.",
        price: 12.99,
        pictureUrl:
          "https://www.hasbro.com/common/productimages/en_GB/2622533e50569047f5c4a77aa2a86686/converteda1407f2ca0d39e52e91b3a8d19180d541af5a993.jpg",
        quantity: 110,
        rating: 4.6,
        ageRecommendationMin: 6,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Clue",
        description:
          "A mystery board game where players must deduce who committed a murder, with what weapon, and in which room, by gathering clues.",
        price: 19.99,
        pictureUrl:
          "https://i5.walmartimages.com/seo/Clue-Classic-Mystery-Board-Game-with-Activity-Sheet-for-Kids-and-Family-Ages-8-and-Up-2-6-Players_d5eb49f3-279d-49cf-a22c-7eae75a50c14.36ddc0f683bd72435367d6d9b7cd5049.jpeg",
        quantity: 85,
        rating: 4.5,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 3,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Pictionary",
        description:
          "A fun drawing game where players sketch clues to help their team guess a word or phrase before time runs out.",
        price: 16.99,
        pictureUrl:
          "https://boardgames-puzzles.com/cdn/shop/products/Pictionary.png?v=1625710506",
        quantity: 95,
        rating: 4.7,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 4,
        playersNumberMax: 8,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Pandemic",
        description:
          "A cooperative board game where players work together to stop the spread of four diseases and find cures before time runs out.",
        price: 39.99,
        pictureUrl:
          "https://cdn.svc.asmodee.net/production-zman/uploads/2024/08/ZM7101-1_720x.png",
        quantity: 90,
        rating: 4.7,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Dixit",
        description:
          "A creative storytelling game where players use illustrated cards to tell a story, and others guess which card was the storyteller’s.",
        price: 34.99,
        pictureUrl: "https://images.thimbletoys.com/images/items/2010079a.jpg",
        quantity: 60,
        rating: 4.7,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 3,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Twister",
        description:
          "A physical game where players place their hands and feet on colored circles on a mat, following instructions from a spinner, often leading to hilarious tangled positions.",
        price: 19.99,
        pictureUrl:
          "https://i5.walmartimages.com/seo/Twister-Game-Party-Game-Classic-Board-Game-for-2-or-More-Players-Indoor-and-Outdoor-Game-for-Kids-6-and-Up_badaed9d-49a1-4ed6-aebb-c1d894caf02d.ba16070e4a0bfdb65f159e9d9d0b9c5d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        quantity: 100,
        rating: 4.4,
        ageRecommendationMin: 6.0,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Codenames",
        description:
          "A word association game where two teams compete to find their agents by guessing words based on clues given by their spymasters.",
        price: 19.99,
        pictureUrl:
          "https://i5.walmartimages.com/seo/Codenames-Czech-Games-Edition-Board-Games-for-Family-and-Adults-Ages-8-For-4-Players_a15a635b-a9ad-4296-b838-3638b5493f7c.64b917812c34ee84f4f0b50e18f33897.jpeg",
        quantity: 130,
        rating: 4.8,
        ageRecommendationMin: 14,
        ageRecommendationMax: 99,
        playersNumberMin: 4,
        playersNumberMax: 8,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Azul",
        description:
          "A tile-laying game where players take turns selecting tiles to complete patterns and score points based on strategic placement.",
        price: 39.99,
        pictureUrl:
          "https://www.bigw.com.au/medias/sys_master/images/images/h41/h68/47853250805790.jpg",
        quantity: 85,
        rating: 4.7,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Exploding Kittens",
        description:
          "A fast-paced card game where players try to avoid drawing an exploding kitten card, while using other cards to sabotage opponents.",
        price: 19.99,
        pictureUrl:
          "https://cdn.anyfinder.eu/assets/AJelSmcSB757MYsw5m3d5w5FFFS9DMd9ycsVvPGF9zyZIVTc2mBb337ZV9aLrkhM",
        quantity: 130,
        rating: 4.6,
        ageRecommendationMin: 7,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Hive",
        description:
          "A two-player abstract strategy game where players work to surround their opponent's queen bee while avoiding being surrounded themselves.",
        price: 24.99,
        pictureUrl:
          "https://cdn.shoplightspeed.com/shops/603622/files/14048323/800x800x3/hive-game-a-game-crawling-with-possibilities.jpg",
        quantity: 75,
        rating: 4.7,
        ageRecommendationMin: 9,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 2,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Cards Against Humanity",
        description:
          "A party game where players complete fill-in-the-blank statements using inappropriate or politically incorrect phrases.",
        price: 25.0,
        pictureUrl:
          "https://cdn.sanity.io/images/vc07edlh/production/1ced8cb3bded4ee975451c15a33cf71c44237303-1400x1260.png?auto=format&q=75&w=600",
        quantity: 150,
        rating: 4.6,
        ageRecommendationMin: 18,
        ageRecommendationMax: 99,
        playersNumberMin: 4,
        playersNumberMax: 20,
      },
    }),
    await prisma.product.create({
      data: {
        name: "7 Wonders",
        description:
          "A card drafting game where players build civilizations by collecting resources, developing structures, and building wonders.",
        price: 44.99,
        pictureUrl:
          "https://cdn.svc.asmodee.net/production-rprod/storage/games/7-wonders/sev-box-3d-1592411287XEcT9.png",
        quantity: 120,
        rating: 4.8,
        ageRecommendationMin: 10,
        ageRecommendationMax: 99,
        playersNumberMin: 3,
        playersNumberMax: 7,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Sushi Go!",
        description:
          "A quick and easy card game where players collect sushi dishes to score points, with each round offering new combinations to strategize.",
        price: 10.99,
        pictureUrl:
          "https://cdn.shoplightspeed.com/shops/635851/files/20773263/660x660x2/sushi-go.jpg",
        quantity: 150,
        rating: 4.5,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Bang!",
        description:
          "A Wild West-themed card game where players take on secret roles and try to eliminate other players through gunfights and strategy.",
        price: 14.99,
        pictureUrl: "https://www.dvgiochi.com/giochi/bang/box.jpg",
        quantity: 100,
        rating: 4.6,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 4,
        playersNumberMax: 7,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Cartographers",
        description:
          "A map-drawing card game where players sketch the map of a kingdom, trying to score points by completing goals set by the cards.",
        price: 24.99,
        pictureUrl:
          "https://static.lelekan.ua/image/cache/catalog/igri/kartografy-ukr/kartohrafy-cartographers-a-roll-player-tale-ukr-igromag-lelekan-box-800x800.png",
        quantity: 95,
        rating: 4.7,
        ageRecommendationMin: 10,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Shit Happens",
        description:
          "A hilariously crude card game where players rank awful situations by how bad they think they are, based on a rating scale.",
        price: 19.99,
        pictureUrl:
          "https://www.saseskos.hu/img/25298/KTM100005997/KTM100005997.webp",
        quantity: 120,
        rating: 4.3,
        ageRecommendationMin: 18,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Hanabi",
        description:
          "A cooperative card game where players work together to create a fireworks display by playing cards in the correct order without seeing their own cards.",
        price: 11.99,
        pictureUrl:
          "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lggo7u4p8k5q50",
        quantity: 100,
        rating: 4.6,
        ageRecommendationMin: 8,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Chess",
        description:
          "The classic two-player strategy game where the objective is to checkmate the opponent's king using a variety of pieces with unique movements.",
        price: 9.99,
        pictureUrl:
          "https://5.imimg.com/data5/SELLER/Default/2023/11/358836920/OY/HO/ZR/39131917/muskaan-chess-plain.jpg",
        quantity: 300,
        rating: 4.9,
        ageRecommendationMin: 6,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 2,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Set",
        description:
          "A fast-paced card game where players must identify sets of three cards based on matching or differing characteristics.",
        price: 14.99,
        pictureUrl:
          "https://cdn.zatu.com/wp-content/uploads/2018/05/18132438/Set-Game-1.jpg",
        quantity: 100,
        rating: 4.6,
        ageRecommendationMin: 6,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 20,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Chutes and Ladders",
        description:
          "A classic children's game where players climb ladders and slide down chutes based on the roll of the dice.",
        price: 9.99,
        pictureUrl: "https://m.media-amazon.com/images/I/71DxnLwra-L.jpg",
        quantity: 100,
        rating: 4.6,
        ageRecommendationMin: 3,
        ageRecommendationMax: 7,
        playersNumberMin: 2,
        playersNumberMax: 4,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Go Fish",
        description:
          "A simple card game where players try to collect pairs of cards by asking others if they have certain cards.",
        price: 5.99,
        pictureUrl: "https://m.media-amazon.com/images/I/61vDpaEYd4L.jpg",
        quantity: 200,
        rating: 4.7,
        ageRecommendationMin: 4,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Operation",
        description:
          "A classic game of skill where players try to remove various items from a patient without touching the sides and causing a buzz.",
        price: 19.99,
        pictureUrl:
          "https://www.hasbro.com/common/productimages/en_US/03B9FF5E50569047F5FFD57592C4E2FE/b1709281bb8cb5c15ba1b7fc705fe0f72a4ee917.jpg",
        quantity: 130,
        rating: 4.6,
        ageRecommendationMin: 6,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Monkey Bingo",
        description:
          "A fun bingo game where kids mark off the animals as they get called out, trying to complete a row to win.",
        price: 9.99,
        pictureUrl:
          "https://m.media-amazon.com/images/I/81g6zEThsRL._AC_UF894,1000_QL80_.jpg",
        quantity: 100,
        rating: 4.7,
        ageRecommendationMin: 4,
        ageRecommendationMax: 8,
        playersNumberMin: 2,
        playersNumberMax: 6,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Dobble",
        description:
          "A fast-paced matching game where players race to spot the one matching symbol between two cards. The first player to call it out wins the round.",
        price: 12.99,
        pictureUrl:
          "https://cdn.svc.asmodee.net/production-asmodeenordics/uploads/2023/01/unnamed_62201382-a2dd-42b7-a504-6396931cc1f3_1024x1024-1.webp",
        quantity: 150,
        rating: 4.7,
        ageRecommendationMin: 6,
        ageRecommendationMax: 99,
        playersNumberMin: 2,
        playersNumberMax: 8,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Puerto Rico",
        description:
          "A strategy game where players act as plantation owners on the island of Puerto Rico, competing to build the most prosperous economy.",
        price: 39.99,
        pictureUrl:
          "https://www.boardgamebandit.ca/cdn/shop/products/puerto-rico-board-game_1024x1024.jpg?v=1611090949",
        quantity: 100,
        rating: 4.6,
        ageRecommendationMin: 12,
        ageRecommendationMax: 99,
        playersNumberMin: 3,
        playersNumberMax: 5,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO Harry Potter: Hogwarts Castle",
        description:
          "Build a detailed model of Hogwarts Castle with iconic features and minifigures from the Harry Potter universe.",
        price: 399.99,
        pictureUrl: "https://img.bricklink.com/ItemImage/OL/71043-1.png",
        quantity: 100,
        rating: 4.9,
        ageRecommendationMin: 16,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO Star Wars: Millennium Falcon",
        description:
          "Build the iconic Millennium Falcon from Star Wars with detailed features, including movable parts, minifigures, and realistic interiors.",
        price: 159.99,
        pictureUrl:
          "https://www.lego.com/cdn/cs/set/assets/blte22f1f8d1cacfb3c/75192_alt1.jpg",
        quantity: 200,
        rating: 4.9,
        ageRecommendationMin: 16,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO Minecraft: The Mountain Cave",
        description:
          "A Minecraft-themed set where players can build and explore a massive cave with mining, mining carts, and mobs.",
        price: 249.99,
        pictureUrl:
          "https://theawesomer.com/photos/2017/07/lego_minecraft_the_mountain_cave_21137_2.jpg",
        quantity: 90,
        rating: 4.8,
        ageRecommendationMin: 12,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO City: Police Station",
        description:
          "A fun police station set with a jail, police car, helicopter, and various accessories to create exciting law enforcement stories.",
        price: 69.99,
        pictureUrl:
          "https://www.lego.com/cdn/cs/set/assets/blt9934ae4a4d628462/60316_alt1.png",
        quantity: 150,
        rating: 4.6,
        ageRecommendationMin: 6,
        ageRecommendationMax: 12,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO Super Mario: Adventures with Mario Starter Course",
        description:
          "An interactive LEGO Mario set where kids can build their own levels and help Mario complete challenges with sound effects.",
        price: 59.99,
        pictureUrl:
          "https://www.lego.com/cdn/cs/set/assets/bltc7650e1226df3fc7/71360_alt23.jpg",
        quantity: 150,
        rating: 4.8,
        ageRecommendationMin: 6,
        ageRecommendationMax: 12,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "LEGO Disney Princess: Cinderella's Dream Castle",
        description:
          "A magical castle where kids can relive the story of Cinderella, featuring a princess, prince, and accessories.",
        price: 39.99,
        pictureUrl: "https://m.media-amazon.com/images/I/91aYS+0bz7L.jpg",
        quantity: 200,
        rating: 4.8,
        ageRecommendationMin: 5,
        ageRecommendationMax: 10,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Ravensburger: 1000 Piece Puzzle - New York City Skyline",
        description:
          "A beautiful 1000-piece puzzle featuring the iconic New York City skyline at sunset.",
        price: 14.99,
        pictureUrl:
          "https://puzzlesplus.com.au/cdn/shop/products/rb14086-2_0_Rburg-NewYork1000pc_1024x1024@2x.jpg?v=1650335989",
        quantity: 120,
        rating: 4.8,
        ageRecommendationMin: 12,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Clementoni: 1000 Piece Puzzle - Venice Canal",
        description:
          "A challenging 1000-piece puzzle depicting the picturesque canals of Venice.",
        price: 19.99,
        pictureUrl:
          "https://m.media-amazon.com/images/I/81FjEwv1zYL._AC_UF894,1000_QL80_.jpg",
        quantity: 90,
        rating: 4.7,
        ageRecommendationMin: 14,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "D-TOYS: 1000 Piece Puzzle - Eiffel Tower",
        description:
          "A challenging 1000-piece puzzle featuring the iconic Eiffel Tower in Paris.",
        price: 29.99,
        pictureUrl:
          "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-dtoys-1000-pieces-eiffel-tower-paris-france.webp",
        quantity: 80,
        rating: 4.9,
        ageRecommendationMin: 16,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Clementoni: 104-Piece Puzzle - Cars 3",
        description:
          "A fun puzzle featuring characters from the Cars 3 movie. Perfect for young fans of Lightning McQueen.",
        price: 10.99,
        pictureUrl:
          "https://m.media-amazon.com/images/I/91JMM1ZyjsL._AC_UF1000,1000_QL80_.jpg",
        quantity: 180,
        rating: 4.8,
        ageRecommendationMin: 5,
        ageRecommendationMax: 8,
        playersNumberMin: 1,
        playersNumberMax: 1,
      },
    }),
    await prisma.product.create({
      data: {
        name: "Ravensburger: 5000 Piece Puzzle - Underwater World",
        description:
          "A vibrant 5000-piece puzzle depicting an underwater scene full of colorful marine life and coral reefs.",
        price: 15.99,
        pictureUrl:
          "https://puzzle.cdn.shoprenter.hu/custom/puzzle/image/cache/w700h700wt1q90/product/ravensburger-puzzle/17426_ravensburger_puzzle_5000_tenger_alatt_1.jpg.webp?lastmod=0.1721819247",
        quantity: 140,
        rating: 4.7,
        ageRecommendationMin: 12,
        ageRecommendationMax: 99,
        playersNumberMin: 1,
        playersNumberMax: 1,
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
        address: "123 Main St, New York",
        billingAddress: "123 Main St, New York",
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
        address: "456 Elm St, Los Angeles",
        billingAddress: "456 Elm St, Los Angeles",
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
        address: "789 Pine St, Chicago",
        billingAddress: "789 Pine St, Chicago",
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
        address: "101 Maple Ave, San Francisco",
        billingAddress: "101 Maple Ave, San Francisco",
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
        address: "202 Oak St, Miami",
        billingAddress: "202 Oak St, Miami",
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
        address: "303 Birch Rd, Boston",
        billingAddress: "303 Birch Rd, Boston",
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
        address: "404 Cedar Blvd, Seattle",
        billingAddress: "404 Cedar Blvd, Seattle",
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
        address: "505 Spruce Ln, Austin",
        billingAddress: "505 Spruce Ln, Austin",
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
        address: "606 Willow St, Denver",
        billingAddress: "606 Willow St, Denver",
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
        address: "707 Aspen Ave, Houston",
        billingAddress: "707 Aspen Ave, Houston",
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

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
	const deletedUsers = await prisma.user.deleteMany({});
  const deletedGenres = await prisma.genre.deleteMany({});
  const deletedArtists = await prisma.artist.deleteMany({});
  const deletedArtistsOnGenres = await prisma.artistsOnGenres.deleteMany({});

  // Seeding users
  await prisma.user.createMany({
    data: [
      { name: "Romain", email: "romain@vache.fr", password: "romainVache"},
      { name: "Julien", email: "julien@auger.fr", password: "julienAuger"},
      { name: "Léonard", email: "leonard@paillet.fr", password: "leonardPaillet"},
      { name: "Adem", email: "adem@duran.fr", password: "ademDuran"},
    ]
  });

    // Seeding Genres
    await prisma.genre.createMany({
      data: [
        { name: "Rap" },
        { name: "Rock" },
        { name: "Pop" },
        { name: "Jazz" },
        { name: "Reggae" },
        { name: "Electro" },
        { name: "Classique" },
        { name: "Hip-hop" },
        { name: "Country" },
        { name: "R&B" }
      ]      
    });

    // Seeding Genres
    await prisma.artist.createMany({
      data: [
        { name: "Kendrick Lamar", country: "États-Unis" },
        { name: "Led Zeppelin", country: "Royaume-Uni" },
        { name: "Michael Jackson", country: "États-Unis" },
        { name: "Miles Davis", country: "États-Unis" },
        { name: "Bob Marley", country: "Jamaïque" },
        { name: "Daft Punk", country: "France" },
        { name: "Ludwig van Beethoven", country: "Allemagne" },
        { name: "Jay-Z", country: "États-Unis" },
        { name: "Johnny Cash", country: "États-Unis" },
        { name: "Eminem", country: "États-Unis" },
        { name: "Beyoncé", country: "États-Unis" },
        { name: "Queen", country: "Royaume-Uni" },
        { name: "Taylor Swift", country: "États-Unis" },
        { name: "Louis Armstrong", country: "États-Unis" },
        { name: "Toots and the Maytals", country: "Jamaïque" },
        { name: "The Chemical Brothers", country: "Royaume-Uni" },
        { name: "Johann Sebastian Bach", country: "Allemagne" },
        { name: "Dr. Dre", country: "États-Unis" },
        { name: "Willie Nelson", country: "États-Unis" },
        { name: "Alicia Keys", country: "États-Unis" }
      ]           
    });

  // Matching artists with genres
  await prisma.artistsOnGenres.createMany({
    data: [
      { artistId: 1, genreId: 1 },
      { artistId: 1, genreId: 8 },
      { artistId: 2, genreId: 2 },
      { artistId: 3, genreId: 3 },
      { artistId: 4, genreId: 4 },
      { artistId: 5, genreId: 5 },
      { artistId: 6, genreId: 6 },
      { artistId: 7, genreId: 7 },
      { artistId: 8, genreId: 8 },
      { artistId: 9, genreId: 9 },
      { artistId: 10, genreId: 10 },
      { artistId: 11, genreId: 1 },
      { artistId: 11, genreId: 8 },
      { artistId: 12, genreId: 1 },
      { artistId: 13, genreId: 2 },
      { artistId: 14, genreId: 3 },
      { artistId: 15, genreId: 4 },
      { artistId: 16, genreId: 5 },
      { artistId: 17, genreId: 6 },
      { artistId: 18, genreId: 7 },
      { artistId: 19, genreId: 8 },
      { artistId: 20, genreId: 4 },
      { artistId: 20, genreId: 10 },
    ]
  });
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

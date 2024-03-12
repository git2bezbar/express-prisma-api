const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


/**
 * Provides the information of all artists.
 * @example
 * ```js
 * getAllArtists(req, res);
 * ```
 */
async function getAllArtists(req, res) {
  const artists = await prisma.artist.findMany({ 
    include: { genres: { select: { genre: { select: { name: true }}}}}
  });

  res.json({ artists });
}

/**
 * Provides the information for a specific artist.
 * @example
 * ```js
 * getArtist(req, res);
 * ```
 */
async function getArtist(req, res) {
  const artist = await prisma.artist.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { genres: { select: { genre: { select: { name: true }}}}} 
  });

  if (!artist) res.status(404).json({ message: "Artist not found" });

  res.json({ artist });
}

/**
 * Creates an artist.
 * @example
 * ```js
 * createArtist(req, res);
 * ```
 */
async function createArtist(req, res) {
  const { name, country, genres } = req.body;

  if (!name || !country || !genres) {
    return res.status(400).json({ message: "Missing name, country or genres" });
  }

  const newArtist = await prisma.artist.create({ data: { name, country }});

  const existingGenres = await prisma.genre.findMany({
    where: { id: { in: genres } }, select: { id: true },
  });

  const existingGenreIds = existingGenres.map(genre => genre.id);
  const missingGenres = genres.filter(genreId => 
    !existingGenreIds.includes(genreId));

  if (missingGenres.length > 0) {
    return res.status(400).json({ 
      message: `Genres with IDs ${missingGenres.join(', ')} do not exist`
    });
  }

  genres.map(async (genreId) => {
    await prisma.artistsOnGenres.create({
      data: { artistId: newArtist.id, genreId: parseInt(genreId)}
    });
  });

  res.redirect(303, `/api/artists/${newArtist.id}`);
}

/**
 * Updates an artist.
 * @example
 * ```js
 * updateArtist(req, res);
 * ```
 */
async function updateArtist(req, res) {
  const { name, country, genres } = req.body;

  if (!req.body.name && !req.body.country && !req.body.genres) {
    return res.status(400).json({ message: "Missing name, country or genres" });
  }
  
  const artist = await prisma.artist.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!artist) res.status(404).json({ message: "Artist not found" });

  const updatedArtist = await prisma.artist.update({
    where: { id: parseInt(req.params.id) }, data: { name, country },
  });

  const existingGenres = await prisma.genre.findMany({
    where: { id: { in: genres } }, select: { id: true },
  });

  const existingGenreIds = existingGenres.map(genre => genre.id);
  const missingGenres = genres
    .filter(genreId => !existingGenreIds.includes(genreId));

  if (missingGenres.length > 0)
    res.status(400).json({
      message: `Genres with IDs ${missingGenres.join(', ')} do not exist`
    });

  await prisma.artistsOnGenres.deleteMany({
    where: { artistId: parseInt(req.params.id) }
  });

  genres.map(async (genreId) => {
    await prisma.artistsOnGenres.create({
      data: { artistId: updatedArtist.id, genreId: parseInt(genreId) }
    });
  });

  const updatedArtistWithGenres = await prisma.artist.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { genres: { select: { genre: { select: { name: true }}}}} 
  });

  res.redirect(303, `/api/artists/${updatedArtistWithGenres.id}`);
}

/**
 * Deletes an artist.
 * @example
 * ```js
 * deleteArtist(req, res);
 * ```
 */
async function deleteArtist(req, res) {
  const artist = await prisma.artist.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!artist) return res.status(404).json({ message: "Artist not found" });
  
  await prisma.artist.delete({ where: { id: parseInt(req.params.id) }});

  res.json({ message: "Artist deleted" });
}

module.exports = {
  getAllArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist
};

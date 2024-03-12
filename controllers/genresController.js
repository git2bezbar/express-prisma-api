const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


/**
 * Provides the information of all genres.
 * @example
 * ```js
 * getAllGenres(req, res);
 * ```
 */
async function getAllGenres(req, res) {
  const genres = await prisma.genre.findMany({});

  res.json({ genres });
}

/**
 * Provides the information for a specific genre.
 * @example
 * ```js
 * getGenre(req, res);
 * ```
 */
async function getGenre(req, res) {
  const genre = await prisma.genre.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  if (!genre) res.status(404).json({ message: "Genre not found" });

  res.json({ genre });
}

/**
 * Creates a genre.
 * @example
 * ```js
 * createGenre(req, res);
 * ```
 */
async function createGenre(req, res) {
  const { name } = req.body;

  if (!name) res.status(400).json({ message: "Missing name" });
  
  const existingGenres = await prisma.genre.findMany({
    where: { name: { in: [name] }}, select: { name: true },
  });

  if (existingGenres.length > 0) {
    return res.status(400).json({ message: "Genre already exists" });
  }

  const newGenre = await prisma.genre.create({ data: { name }});
  
  res.redirect(303, `/api/genres/${newGenre.id}`);
}

/**
 * Updates a genre.
 * @example
 * ```js
 * updateGenre(req, res);
 * ```
 */
async function updateGenre(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Missing name" });
  
  const genre = await prisma.genre.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!genre) res.status(404).json({ message: "Genre not found" });

  const existingGenres = await prisma.genre.findMany({
    where: { name: { in: [name] }}, select: { name: true },
  });

  if (existingGenres.length > 0) {
    return res.status(400).json({ message: "Genre has already this name" });
  }

  const updatedGenre = await prisma.genre.update({
    where: { id: parseInt(req.params.id) }, data: { name },
  });

  res.redirect(303, `/api/genres/${updatedGenre.id}`);
}

/**
 * Deletes a genre.
 * @example
 * ```js
 * deleteGenre(req, res);
 * ```
 */
async function deleteGenre(req, res) {
  const genre = await prisma.genre.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!genre) return res.status(404).json({ message: "Genre not found" });
  
  await prisma.genre.delete({ where: { id: parseInt(req.params.id) }});

  res.json({ message: "Genre deleted" });
}

module.exports = {
  getAllGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre
};

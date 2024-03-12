const express = require('express');
const router = express.Router();

const {
  getAllGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre
} = require("../controllers/genresController");

const auth = require("../middlewares/auth");

router.get("/", getAllGenres);
router.get("/:id", getGenre);
router.post("/", auth, createGenre);
router.put("/:id", auth, updateGenre);
router.delete("/:id", auth, deleteGenre);

module.exports = router;

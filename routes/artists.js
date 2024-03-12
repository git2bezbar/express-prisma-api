const express = require('express');
const router = express.Router();

const {
  getAllArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist
} = require("../controllers/artistsController");

const auth = require("../middlewares/auth");

router.get("/", getAllArtists);
router.get("/:id", getArtist);
router.post("/", auth, createArtist);
router.put("/:id", auth, updateArtist);
router.delete("/:id", auth, deleteArtist);

module.exports = router;

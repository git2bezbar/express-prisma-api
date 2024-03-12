const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const artists = require("./artists");
const genres = require("./genres");

router.use("/", authRoutes);
router.use("/artists", artists);
router.use("/genres", genres);

module.exports = router;

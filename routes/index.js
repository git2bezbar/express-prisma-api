const express = require("express");
const router = express.Router();

const artists = require("./artists");
const genres = require("./genres");

router.use("/artists", artists);
router.use("/genres", genres);

module.exports = router;

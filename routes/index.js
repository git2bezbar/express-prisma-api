const express = require("express");
const router = express.Router();

const artists = require("./artists");
router.use("/artists", artists);

module.exports = router;

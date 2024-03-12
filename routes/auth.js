const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: username,
      password,
    },
  });

	if (user !== null) {
		// Encodage du JWT via la variable d'environnement JWT_SECRET
		const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		// Stockage du JWT dans un cookie HttpOnly
		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
		res.json(jwtToken);
	} else {
		res.status(401).json({ message: "Authentification échouée." });
	}
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken");
	res.redirect('/');
});

module.exports = router;

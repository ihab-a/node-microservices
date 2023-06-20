const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./db/db.js")("users").collection("users");
const { microservices, ENV_SECRET } = require("./env.js");

const app = express();

app.use(express.json());

app.listen(9003, () => {
	console.log(`authentication microservice running on [${microservices.authentication.port}]`);
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await users.findOne({ email });

	if(!user)
		return res.send({ error : "Email does not exist" });

	if(! await bcrypt.compare(password, user.password))
		return res.send({ error : "Incorrect password" });

	const token = jwt.sign(
		{ id : user._id },
		ENV_SECRET,
		{ expiresIn : "30d" },
	);

	return res.send({
		id: user._id,
		token,
	});
});


app.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	const user = await users.insertOne({
		email,
		password : await bcrypt.hash(password, 10)
	});

	const token = jwt.sign(
		{ id : user._id },
		ENV_SECRET,
		{ expiresIn : "30d" },
	);

	return res.send({
		id: user._id,
		token,
	});
});
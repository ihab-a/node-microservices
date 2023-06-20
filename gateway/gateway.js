const express = require("express");
const axios = require("axios");
const { microservices } = require("./env.js");

const app = express();

app.use(express.json());

app.listen(9000, () => {
	console.log("gateway up and running.");
});

// authentication miscroservice
app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const { data } = await axios.post(microservices.authentication.route("login"), {
		email,
		password
	});

	res.send(data);
});

// authentication miscroservice
app.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	const { data } = await axios.post(microservices.authentication.route("signup"), {
		email,
		password
	});

	res.send(data);
});

// users microservice
app.get("/users", async (req, res) => {
	const { data } = await axios.get(microservices.user.route());
	res.send(data);
});
app.get("/users/:id", async (req, res) => {
	const { data } = await axios.get(microservices.user.route(req.params.id));
	res.send(data);
});
app.put("/users/:id/points", async (req, res) => {
	const { data } = await axios.put(microservices.user.route(`${req.params.id}/points`));
	res.send(data);
});

// books microservice
app.get("/books", async (req, res) => {
	const { data } = await axios.get(microservices.book.route());
	res.send(data);
});
app.get("/books/:id", async (req, res) => {
	const { data } = await axios.get(microservices.book.route(req.params.id));
	res.send(data);
});

// transaction microservice
app.get("/transaction", async (req, res) => {
	const { data } = await axios.get(microservices.transaction.route(), {
		headers : {
			authorization: req.headers.authorization,
		}
	});
	res.send(data);
});

app.post("/transaction", async (req, res) => {
	const { data } = await axios.post(microservices.transaction.route(), {
		book : req.body.book,
		}, {
		headers : {
			authorization: req.headers.authorization,
		}
	});

	res.send(data);
})
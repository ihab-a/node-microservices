const express = require("express");
const { ObjectId } = require("mongodb");
const transactionConsumer = require("./transactionConsumer");
const books = require("./db/db.js")("books").collection("books");
const { microservices } = require("./env.js");

const app = express();

app.use(express.json());

transactionConsumer();
app.listen(9002, "127.0.0.1", () => {
	console.log(`books microservice running on [${microservices.book.port}]`);
});


app.get("/", async (req, res) => {
	res.send(await books.find().toArray());
});

app.post("/", async (req, res) => {
	await books.insertOne(req.body);
	res.send({ msg : "success" });
});

app.get("/:id", async (req, res) => {
	res.send(await books.findOne({ _id: new ObjectId(req.params.id) }));
});

app.delete("/:id", async (req, res) => {
	await books.deleteOne({ _id: new ObjectId(req.params.id) });
	res.send({ msg : "success" });
});
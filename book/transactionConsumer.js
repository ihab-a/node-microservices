const books = require("./db/db.js")("books").collection("books");
const { ObjectId } = require("mongodb");
const { AMQP_URI } = require("./env.js");
const amqp = require("amqplib");

module.exports = async () => {
	const connection = await amqp.connect(AMQP_URI);

	const channel = await connection.createChannel();

	await channel.assertExchange("transaction");

	const { queue } = await channel.assertQueue("transaction-book");

	channel.bindQueue(queue, "transaction", "");

	channel.consume(queue, async (msg) => {
		data = JSON.parse(msg.content.toString());

		const update = await books.updateOne(
			{ _id: new ObjectId(data.book), quantity: {$gt : 0} },
			{$inc : {quantity : -1}}
		);

		channel.ack(msg);
	});
}
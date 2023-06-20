const users = require("./db/db.js")("users").collection("users");
const { ObjectId } = require("mongodb");
const { AMQP_URI } = require("./env.js")
const amqp = require("amqplib");

module.exports = async () => {
	const connection = await amqp.connect(AMQP_URI);

	const channel = await connection.createChannel();

	await channel.assertExchange("transaction");

	const { queue } = await channel.assertQueue("transaction-user");

	channel.bindQueue(queue, "transaction", "");

	channel.consume(queue, async (msg) => {
		data = JSON.parse(msg.content.toString());

		const update = await users.updateOne(
			{ _id: new ObjectId(data.user) }, 
			{$inc : {points : 1}}
		);

		channel.ack(msg);
	});
}
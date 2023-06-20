const { AMQP_URI } = require("./env.js")
const amqp = require("amqplib");

module.exports = async (user, book) => {
	const connection = await amqp.connect(AMQP_URI);

	const channel = await connection.createChannel();

	await channel.assertExchange("transaction");

	const msg = JSON.stringify({
		user,
		book
	});

	channel.publish("transaction", "", Buffer.from(msg));
}
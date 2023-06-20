// database config
const DB_USER = "";
const DB_PASSWORD = "";
const DB_HOST = "micro_mongodb";
const DB_PORT = "27017";

// rabbitmq
const AMQP_URI = "amqp://micro_rabbitmq:5672";

const MICROSERVICE_USER_PORT = "9001";
const MICROSERVICE_BOOK_PORT = "9002";
const MICROSERVICE_AUTHENTICATION_PORT = "9003";
const MICROSERVICE_TRANSACTION_PORT = "9004";

const DB_URI = (() => {
	if(!DB_USER || !DB_PASSWORD)
		return `mongodb://${DB_HOST}:${DB_PORT}?directConnection=true`;
	return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}?directConnection=true`;
})();

module.exports = {
	ENV_SECRET: "d15b9c4c19a67b472edc303d70c4d2e1f15df865e1487ad14dd13bd14cea0eb4e92d6654688e9b6c6d1df3593b0e3811bf4dd473ed5a3603d8cc738ff100b408",
	DB_URI,
	AMQP_URI,
	microservices : {
		user: {
			port : MICROSERVICE_USER_PORT,
			route : (r="") => `http://micro_user:${MICROSERVICE_USER_PORT}/${r}`,
		},
		transaction: {
			port : MICROSERVICE_TRANSACTION_PORT,
			route : (r="") => `http://micro_transaction:${MICROSERVICE_TRANSACTION_PORT}/${r}`,
		},
		book: {
			port : MICROSERVICE_BOOK_PORT,
			route : (r="") => `http://micro_book:${MICROSERVICE_BOOK_PORT}/${r}`,
		},
		authentication: {
			port : MICROSERVICE_AUTHENTICATION_PORT,
			route : (r="") => `http://micro_authentication:${MICROSERVICE_AUTHENTICATION_PORT}/${r}`,
		},
	}
}
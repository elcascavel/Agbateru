exports.run = async (client, message) => {
	const response = await client.fetch('https://api.chucknorris.io/jokes/random');
	const fact = await response.json();
	message.reply(fact.value);
};
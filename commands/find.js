exports.run = async (client, message, args) => {

	const game = args[0];
	const file = args[1];

	if(game != null) {
		const fetchGameFile = await client.fetch(`http://192.168.1.220:8080/api/gta/${game}}/${file}`);
		const gameFileData = await fetchGameFile.json();
		message.channel.send(gameFileData.value);
	}
	else {
		message.reply('Please supply a valid country in the format `++covid [country]`');
		return;
	}
};
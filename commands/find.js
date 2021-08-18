exports.run = async (client, message, args) => {

	const file = args[0];

	if(file != null) {
		const fetchGameFile = await client.fetch(`http://192.168.1.220:8080/api/gta/sa/?name=${file}`);
		const gameFileData = await fetchGameFile.json();
		if(!gameFileData[0]) {
			return message.channel.send(`No results found for **${file}**.`);
		}
		message.channel.send(`Pulling files from database pertaining to **${file}**.`);
		message.channel.send({
			files: [
				gameFileData[0].urlDFF,
				gameFileData[0].urlTXD,
			],
		});
	}
	else {
		message.reply('Please supply a valid file in the format `++find [fileName]`');
		return;
	}
};
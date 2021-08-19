exports.run = async (client, message, args) => {

	const fileType = args[0];
	const file = args[1];

	if(fileType != 'dff' || fileType != 'txd' || fileType != 'img' && file != null) {
		const fetchGameFile = await client.fetch(`http://192.168.1.220:8080/api/gta/sa/${fileType}/?name=${file}`);
		const gameFileData = await fetchGameFile.json();
		if(!gameFileData[0]) {
			return message.channel.send(`No results found for ${fileType} **${file}**.`);
		}
		message.channel.send(`Pulling files from database pertaining to **${file}**.`);
		if (fileType === 'dff') {
			message.channel.send({
				files: [
					gameFileData[0].urlDFF,
				],
			});
		}
		else if (fileType === 'txd') {
			message.channel.send({
				files: [
					gameFileData[0].urlTXD,
				],
			});
		}

		else if (fileType === 'img') {
			message.channel.send({
				files: [
					gameFileData[0].urlIMG,
				],
			});
		}
	}
	else {
		message.reply('Please supply a valid file in the format `++find [fileName]`');
		return;
	}
};
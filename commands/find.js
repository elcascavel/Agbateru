exports.run = async (client, message, args) => {

	const imageFile = args[0];
	const file = args[1];
	let fetchGameFile;
	let gameFileData;

	if (imageFile === 'gta3' || imageFile == 'player') {
		fetchGameFile = await client.fetch(`http://192.168.1.220:4560/api/v1/gta/sa/${imageFile}?title=${file}`);
		gameFileData = await fetchGameFile.json();
	}
	else if (imageFile === undefined) {
		message.reply('Please supply a valid file name in the format `++find [gta3/player] [fileName]`');
		return;
	}
	else {
		return message.channel.send(`**${imageFile}.img** file does not exist! Please supply a valid file name in the format ++find [gta3/player] [fileName]`);
	}

	function validateParameters() {
		if (file != null) {
			if (!gameFileData[0]) {
				return message.channel.send(`No results found for **${file}**.`);
			}

			if (gameFileData[0].urlDFF != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlDFF,
					],
				});
			}

			if (gameFileData[0].urlTXD != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlTXD,
					],
				});
			}

			if (gameFileData[0].urlIMG != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlIMG,
					],
				});
			}
		}
		else {
			message.reply('Please supply a valid file name in the format `++find [gta3/player] [fileName]`');
			return;
		}
	}


	validateParameters();
};

exports.find = {
	name: 'find',
	description: 'find gta files from GTA:SA',
};
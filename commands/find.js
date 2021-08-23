exports.run = async (client, message, args) => {

	const file = args[0];
	const fetchGameFile = await client.fetch(`http://192.168.1.220:4560/api/v1/gta/?title=${file}`);
	const gameFileData = await fetchGameFile.json();

	function validateParameters() {
		if (file != null) {
			if (!gameFileData[0]) {
				return message.channel.send(`No results found for **${file}**.`);
			}

			else if (gameFileData[0].urlDFF != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlDFF,
					],
				});
			}

			else if (gameFileData[0].urlTXD != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlTXD,
					],
				});
			}

			else if (gameFileData[0].urlIMG != undefined) {
				message.channel.send({
					files: [
						gameFileData[0].urlIMG,
					],
				});
			}
		}
		else {
			message.reply('Please supply a valid file name in the format `++find [fileName]`');
			return;
		}
	}


	validateParameters();
};
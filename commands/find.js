const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

	const file = args[0];

	if(file != null) {
		const fetchGameFile = await client.fetch(`http://192.168.1.220:8080/api/gta/sa/?name${file}`);
		const gameFileData = await fetchGameFile.json();

		const fileEmbed = new MessageEmbed()
			.setColor('#f15bcb')
			.setTitle(gameFileData[0].name + ' Information')
			.setThumbnail(gameFileData[0].urlTXD)
			.addFields(
				{ name: 'DFF', value: gameFileData[0].urlDFF },
				{ name: 'TXD', value: gameFileData[0].urlTXD },
			);
		message.channel.send({ embeds: [fileEmbed] });
	}
	else {
		message.reply('Please supply a valid file in the format `++find [fileName]`');
		return;
	}
};
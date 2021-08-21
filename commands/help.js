const fs = require('fs');
const { MessageEmbed } = require('discord.js');

const cmdArray = [];

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const commandName = file.split('.')[0];
		cmdArray.push(commandName);
	});
});

exports.run = async (client, message) => {

	const helpEmbed = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle('Domagoj Commands')
		.setThumbnail(client.user.displayAvatarURL())
		.addFields(
			{ name: client.config.prefix + cmdArray[0], value: 'get a random chuck norris quote', inline: true },
			{ name: client.config.prefix + cmdArray[1], value: 'real time covid stats per country', inline: true },
			{ name: client.config.prefix + cmdArray[2], value: 'fetch gta files', inline: true },
			{ name: client.config.prefix + cmdArray[3], value: '🤔', inline: true },
			{ name: client.config.prefix + cmdArray[4], value: 'pong!', inline: true },
			{ name: client.config.prefix + cmdArray[5], value: 'reverse a keyword', inline: true },
			{ name: client.config.prefix + cmdArray[6], value: 'get stats for domagoj', inline: true },
		);
	message.channel.send({ embeds: [helpEmbed] });
};

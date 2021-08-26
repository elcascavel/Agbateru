const { MessageEmbed } = require('discord.js');
const { ask } = require('./ask');
const { covid } = require('./covid');
const { find } = require('./find');
const { stats } = require('./stats');
const { userinfo } = require('./userinfo');

exports.run = async (client, message) => {

	const helpEmbed = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle('Domagoj Commands')
		.setDescription('🎵 Get down, it\'s saturday night 🎵')
		.setThumbnail(client.user.displayAvatarURL())
		.addFields(
			{ name: 'Helpful', value: '```' + ask.name + ', ' + userinfo.name + ', ' + stats.name + '```', inline: true },
			{ name: 'GTA', value: '```' + find.name + '```', inline: false },
			{ name: 'Real World', value: '```' + covid.name + '```', inline: false },
		);
	message.channel.send({ embeds: [helpEmbed] });
};

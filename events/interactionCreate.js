const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const logInteractionEmbed = new MessageEmbed()
			.setColor('#f15bcb')
			.setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
			.setDescription('Interaction triggered')
			.setThumbnail(interaction.guild.iconURL())
			.addFields(
				{ name: 'Server', value: interaction.guild.name },
				{ name: 'Channel', value: '#' + interaction.channel.name, inline: true },
				{ name: 'Interaction', value: '/' + interaction.commandName, inline: true },
			)
			.setTimestamp();
		interaction.client.channels.cache.get(interaction.client.config.logChannel).send({ embeds: [logInteractionEmbed] });
	},
};
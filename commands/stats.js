const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { version } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Check Agbateru\'s stats.'),
	async execute(interaction) {
		const duration = moment.duration(interaction.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const agbateruStatsEmbed = new MessageEmbed()
			.setColor('#f15bcb')
			.setTitle('Agbateru Stats')
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.addFields(
				{ name: 'Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + ' MB', inline: true },
				{ name: 'Uptime', value: `${duration}`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Discord.js', value: `v${version}`, inline: true },
				{ name: 'Node', value: `${process.version}`, inline: true },
			)
			.setFooter({ text: 'Author: Cascavel#4697' })
			.setTimestamp();
		await interaction.reply({ embeds: [agbateruStatsEmbed] });
	},
};
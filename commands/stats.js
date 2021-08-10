const { version } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, message, args, level, channel) => { // eslint-disable-line no-unused-vars
	message.react('👀');
	const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	const statsEmbed = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle('Domagoj Stats')
		.addFields(
			{ name: 'Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + ' MB', inline: true },
			{ name: 'Uptime', value: `${duration}`, inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Discord.js', value: `v${version}`, inline: true },
			{ name: 'Node', value: `${process.version}`, inline: true },
		)
		.setTimestamp();

	message.channel.send(statsEmbed);
};
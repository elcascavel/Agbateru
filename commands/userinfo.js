const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
	const userEmbed = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle('User Information for ' + message.member.displayName)
		.setThumbnail(message.author.displayAvatarURL())
		.addFields(
			{
				name: 'Username',
				value: message.author.tag, inline: true,
			},
			{
				name: 'ID',
				value: message.author.id, inline: true,
			},
			{
				name: 'Created',
				value: `${message.author.createdAt.toLocaleString()}`, inline: true,
			},
			{
				name: 'Joined',
				value: `${message.member.joinedAt.toLocaleString()}`, inline: true,
			},
			{
				name: 'Roles',
				value: message.member.roles.cache.map(r => r.name).join(' , '), inline: true,
			},
		);
	message.channel.send({ embeds: [userEmbed] });
};

exports.userinfo = {
	name: 'userinfo',
	description: 'get information about your account',
};
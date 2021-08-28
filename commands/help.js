const { MessageEmbed } = require('discord.js');
const { ask } = require('./ask');
const { covid } = require('./covid');
const { find } = require('./find');
const { magictxd } = require('./magictxd');
const { stats } = require('./stats');
const { userinfo } = require('./userinfo');

function commandEmbedFunc(verbose, prefix, title, description, argument, argument2) {
	const commandEmbed = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle(title)
		.setDescription(description)
		.addFields(
			{ name: 'What is the structure of this command?', value: '```' + prefix + title + ' ' + argument + ' ' + argument2 + '```' },
		);

	const commandEmbedVerbose = new MessageEmbed()
		.setColor('#f15bcb')
		.setTitle(title)
		.setDescription(description)
		.addFields(
			{ name: 'What is the structure of this command?', value: '```' + prefix + title + ' ' + argument + ' ' + argument2 + '```' },
			{ name: 'Show me an example on how to use this command', value: '```' + prefix + title + ' gta3 fam2' + '```' },
		);

	if (verbose === false) {
		return commandEmbed;
	}
	else {
		return commandEmbedVerbose;
	}
}

exports.run = async (client, message, args) => {

	const cmd = args[0];
	if (cmd === undefined) {
		const helpEmbed = new MessageEmbed()
			.setColor('#f15bcb')
			.setTitle('Domagoj Commands')
			.setDescription('++help [commandName] for information on how to use the command')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Helpful', value: '```' + ask.name + ', ' + userinfo.name + ', ' + stats.name + '```', inline: true },
				{ name: 'GTA', value: '```' + find.name + ', ' + magictxd.name + '```', inline: false },
				{ name: 'Real World', value: '```' + covid.name + '```', inline: false },
			)
			.setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL());
		message.channel.send({ embeds: [helpEmbed] });
	}
	else if (cmd === ask.name) {
		message.channel.send({ embeds: [commandEmbedFunc(false, client.config.prefix, ask.name, 'Useful to remind users about not asking to ask.', '', '')] });
	}
	else if (cmd === magictxd.name) {
		message.channel.send({ embeds: [commandEmbedFunc(false, client.config.prefix, magictxd.name, 'Useful to remind users about not asking to ask.', '', '')] });
	}
	else if (cmd === find.name) {
		message.channel.send({ embeds: [commandEmbedFunc(true, client.config.prefix, find.name, 'Fetch GTA:SA files. Only gta3.img and player.img are currently supported.', '(gta3/player)', '(fileName)')] });
	}
};

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('magictxd')
		.setDescription('Remind users to use MagicTXD.'),
	async execute(interaction) {
		await interaction.reply('Please use MagicTXD, TXD Workshop is known to break TXD files and you may encounter streaming errors! <https://gtaforums.com/topic/851436-relopensrc-magictxd/>');
	},
};
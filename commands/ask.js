const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Remind users on how to ask questions.'),
	async execute(interaction) {
		await interaction.reply('Please just ask your question. Don\'t ask to ask. Don\'t ask for topic experts or DMs. Don\'t ping random users. Skip the formalities and ask away! <https://dontasktoask.com/>');
	},
};
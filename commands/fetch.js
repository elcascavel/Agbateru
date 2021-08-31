const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('Fetch GTA:SA files.')
		.addSubcommand(gta3Cmd =>
			gta3Cmd
				.setName('gta3')
				.setDescription('Fetch files from gta3.img')
				.addStringOption(option => option.setName('file').setRequired(true).setDescription('File to fetch from database.')))
		.addSubcommand(playerCmd =>
			playerCmd
				.setName('player')
				.setDescription('Fetch files from player.img')
		        .addStringOption(option => option.setName('file').setRequired(true).setDescription('File to fetch from database.'))),
	async execute(interaction) {
		let imageFile;
		if (interaction.options.getSubcommand() === 'gta3') {
			imageFile = 'gta3';
		}
		else if (interaction.options.getSubcommand() === 'player') {
			imageFile = 'player';
		}
		let fetchGameFile;
		try {
			fetchGameFile = await interaction.client.fetch(`${interaction.client.config.gtaApiServer}/api/v1/gta/sa/${imageFile}?title=${interaction.options.getString('file')}`);
		}
		catch(e) {
			interaction.reply({ content: 'Connection has been refused to the server. It may be down! Try again later 😔', ephemeral: true });
			console.log('ECONN REFUSED - SERVER IS DOWN');
			return;
		}
		const gameFileData = await fetchGameFile.json();

		let hasReturned = false;

		try {
			await interaction.reply({
				files: [
					gameFileData[0].urlDFF,
				],
			});
			hasReturned = true;

			if (hasReturned === true) {
				await interaction.followUp({
					files: [
						gameFileData[0].urlTXD,
					],
				});
			}

			else if (hasReturned === false) {
				await interaction.reply({
					files: [
						gameFileData[0].urlTXD,
					],
				});
			}
		}
		catch (error) {
			interaction.reply({ content: `${interaction.options.getString('file')} does not exist!`, ephemeral: true });
		}
	},
};
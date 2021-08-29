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

		const fetchGameFile = await interaction.client.fetch(`${interaction.client.config.gtaApiServer}/api/v1/gta/sa/${imageFile}?title=${interaction.options.getString('file')}`);
		const gameFileData = await fetchGameFile.json();

        let hasReturned = false;

		if (gameFileData[0].urlDFF != undefined) {
			await interaction.reply({
				files: [
					gameFileData[0].urlDFF,
				],
			});
            hasReturned = true;
		}

        if (hasReturned === true && gameFileData[0].urlTXD != undefined) {
			await interaction.followUp({
				files: [
					gameFileData[0].urlTXD,
				],
			});
		}

		else if (hasReturned === false && gameFileData[0].urlTXD != undefined) {
			await interaction.reply({
				files: [
					gameFileData[0].urlTXD,
				],
			});
		}

		else {
			await interaction.reply(`File with name ${interaction.options.getString('file')} not found.`);
			return;
		}
	},
};
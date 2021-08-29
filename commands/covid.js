const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('covid')
		.setDescription('Get COVID-19 information per country.')
		.addStringOption(option => option.setName('country').setDescription('Country to get information from').setRequired(true)),
	async execute(interaction) {
		const country = interaction.options.getString('country');
		const fetchCountry = await interaction.client.fetch(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`);
		const countryData = await fetchCountry.json();

		if (countryData.cases === undefined) {
			await interaction.reply(countryData.message + '.');
			return;
		}
		else {
			const covidEmbed = new MessageEmbed()
				.setColor('#f15bcb')
				.setTitle(countryData.country + ' COVID-19 Stats')
				.setThumbnail(countryData.countryInfo.flag)
				.addFields(
					{ name: 'Cases', value: numberWithCommas(countryData.cases) },
					{ name: 'Cases Today', value: numberWithCommas(countryData.todayCases) },
					{ name: 'Deaths', value: numberWithCommas(countryData.deaths), inline: true },
					{ name: 'Deaths Today', value: numberWithCommas(countryData.todayDeaths), inline: true },
					{ name: 'Recovered', value: numberWithCommas(countryData.recovered), inline: true },
					// { name: 'Total Vaccines', value: numberWithCommas(vaccineData.timeline.date), inline: true },
				);
			await interaction.reply({ embeds: [covidEmbed] });
		}
	},
};
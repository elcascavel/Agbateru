const { MessageEmbed } = require('discord.js');

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

exports.run = async (client, message, args) => {

	const country = args[0];
	if (message.guild.id != client.config.lowpolyChestID) {
		if (country != null) {
			const fetchCountry = await client.fetch(`https://disease.sh/v3/covid-19/countries/${country}?strict=true`);
			// const fetchVaccines = await client.fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=all&fullData=false`);
			const countryData = await fetchCountry.json();
			if (countryData.cases === undefined) {
				message.reply(countryData.message);
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
			message.channel.send({ embeds: [covidEmbed] });
			}
			// const vaccineData = await fetchVaccines.json();

			
		}
		else {
			message.reply('Please supply a valid country in the format `++covid [country]`');
			return;
		}
	}
	else {
		message.reply(`Use Nutter's bot for that, man.`);
	}
};
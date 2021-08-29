const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
const config = require('./config.json');
const fetch = require('node-fetch');
const querystring = require('querystring');
client.config = config;
client.fetch = fetch;
client.querystring = querystring;

const fs = require('fs');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	// If the command doesn't exist, it will return undefined, so exit early with return.
	if (!command) return;

	// If it does exist, call the command's .execute() method, and pass in the interaction variable as its argument.
	try {
		await command.execute(interaction);
		// In case something goes wrong, log the error and report back to the member to let them know.
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// login to Discord with your app's token
client.login(config.token);
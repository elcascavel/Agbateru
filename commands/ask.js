exports.run = (client, message) => {
	message.channel.send('Please just ask your question. Don\'t ask to ask. Don\'t ask for topic experts or DMs. Don\'t ping random users. Skip the formalities and ask away! <https://dontasktoask.com/>');
};

exports.ask = {
	name: 'ask',
	description: 'remind users on how to ask questions',
};
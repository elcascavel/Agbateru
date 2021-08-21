function reverseString(str) {
	// Step 1. Use the split() method to return a new array
	const splitString = str.split('');

	// Step 2. Use the reverse() method to reverse the new created array
	const reverseArray = splitString.reverse();

	// Step 3. Use the join() method to join all elements of the array into a string
	const joinArray = reverseArray.join('');

	// Step 4. Return the reversed string
	return joinArray;
}

exports.run = (client, message, args) => {
	const word = args[0];
	if (word != null) {
		message.channel.send(`${word} in reverse is ${reverseString(word)}`);
	}
	else {
		message.channel.reply('Please provide a word to reverse.');
	}
	
};
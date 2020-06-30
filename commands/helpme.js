exports.run = (client, message, args) => {
    const embed = {
    "color": 4886754,
    "thumbnail": {
      "url": "https://www.kindpng.com/picc/m/106-1062032_pixel-question-mark-png-question-mark-pixel-art.png"
    },
    "title": "I need help!",
    "description": "If someone summoned this box, it means you asked a bad question. Let's dive deeper into this subject with examples.",
    "fields": [
      {
        "name": "Bad question examples:",
        "value": "How do I move something? How do I install Blender? Where is the delete button on my keyboard?"
      },
      {
        "name": "So how do I ask a good question?",
        "value": "Exhaust all your other options. Use Google, be curious. Your question should be exact and shouldn't be answered in a two second Google search. Do not expect people to solve issues for you."
      },
      {
        "name": "Examples of a good question:",
        "value": "Some of my mesh's faces are invisible! I've tried X and Y and it still doesn't work! Any ideas?"
      },
      {
        "name": "Don't be afraid of asking questions.",
        "value": "Just be aware. You'll know when to ask a question."
      }
    ]
  };
  message.channel.send({ embed }).catch(console.error);
  message.react('👀');
}
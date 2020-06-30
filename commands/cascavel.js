exports.run = (client, message, args) => {
    const embed = {
        "title": "Cascavel's YouTube",
        "description": "General information of Cascavel's social media presence.",
        "url": "https://www.youtube.com/channel/UCUuUjk0WB74ylQlkrPCvbHw",
        "color": 9331771,
        "thumbnail": {
          "url": "https://yt3.ggpht.com/a-/AOh14Gjo7_RaKdnVbbO3zuxqsJ4lu96UwM9q0G-2wNx6=s100-c-k-c0xffffffff-no-rj-mo"
        },
        "fields": [
          {
            "name": "Got an idea for a video?",
            "value": "Let it be known in #talk!"
          },
          {
            "name": "Need help? Avoid tagging me unless it's urgent.",
            "value": "Check #blender or #3ds! If they're being used go to #help!"
          }
        ]
      };
      message.channel.send({ embed }).catch(console.error);
      message.react('👀');
}
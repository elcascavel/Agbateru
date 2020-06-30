exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.find(role => role.name === "Moderator");
    if (!modRole)
      return console.log("The moderator role does not exist");
  
    if (!message.member.roles.has(modRole.id))
      return message.reply("you can't use this command.");
  
    if (message.mentions.members.size === 0)
      return message.reply("please mention a user to ban.");
  
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.reply("I don't have permission to ban.");
  
    const banMember = message.mentions.members.first();
  
    banMember.banMember(reason.join(" ")).then(member => {
      message.reply(`${member.user.username} was succesfully banned.`);
      message.react('👀');
    });
  };
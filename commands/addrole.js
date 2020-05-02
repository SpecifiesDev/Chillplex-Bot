
const embeds = require('../embeds');

let addrole = async (message, args, prefix) => {

    if(!args[1] || !args[2]) return await message.channel.send(embeds.embed("Invalid Arguments", `Usage:\n ${prefix}addrole <tag> <role>`));

    let mod = message.guild.roles.cache.find(role => role.name === "Mod");
    if(!(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.has(mod))) return await message.channel.send(embeds.embed("Invalid Permission", "You must be a mod+ to use this command."));

    let role = message.guild.roles.cache.find(role => role.name === args[2]);

    if(!role) return await message.channel.send(embeds.embed("Error", `The role "${args[2]}" does not exist.`));

    let user = message.guild.members.cache.get(message.mentions.users.first().id);

    if(!user) return await message.channel.send(embeds.embed("Error", "Error with obtaining user object."));

    if(user.roles.cache.has(role)) return await message.channel.send("Error", `The user already has the specified role. \nUse ${prefix}removerole to remove it.`);

    user.roles.add(role);

    await message.channel.send(embeds.embed("Success", "User now has the specified role."));

}

let getHelp = () => {
    return "Usage:\n~addrole <tag> <role>\nDescription: Add a specified role to a user.\nParameters: [tag] Discord tag of the user. Can also be type of id. [role] Role. Can either be string or type of id.";
}

module.exports = { addrole: addrole, getHelp: getHelp };
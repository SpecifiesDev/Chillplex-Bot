const embeds = require("../embeds");

const removerole = (message, args, prefix) => {

    if(!args[1] || !args[2]) return await message.channel.send(embeds.embed("Invalid Arguments", `Usage:\n ${prefix}removerole <tag> <role>`));

    let role = message.guild.roles.cache.find(role => role.name === args[2]);

    if(!role) return await message.channel.send(embeds.embed("Error", `The role "${args[2]}" does not exist.`));

    let user = message.guild.members.cache.get(message.mentions.users.first().id);

    if(!user) return await message.channel.send(embeds.embed("Error", "Error with obtaining user object."));

    if(!user.roles.cache.has(role)) return await message.channel.send("Error", `The does not have the specified role.`);

    user.roles.add(role);

    await message.channel.send(embeds.embed("Success", "Specified role removed from user."));
}

const getHelp = () => {
    return "Usage:\n~removerole <tag> <role>\nDescription: Remove a specified role from a user.\nParameters: [tag] Discord tag of the user. Can also be type of id. [role] Role. Can either be string or type of id.";
}

module.exports = { removerole: removerole, getHelp: getHelp };
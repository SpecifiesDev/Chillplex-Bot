const embeds = require("../embeds");

const togglenotifs = async (message) => {

    let ping = message.guild.roles.cache.find(role => role.name === "Ping");

    if(message.member.roles.cache.has(ping)) {
        await message.member.roles.remove(ping);
        await message.channel.send(embeds.embed("Toggled Off", "Notifications have been toggled off."));
    } else if(!message.member.roles.cache.has(ping)) {
        await message.member.roles.add(ping);
        await message.channel.send(embeds.embed("Toggled On", "Notifications have been toggled on."));
    }

}

module.exports = { togglenotifs: togglenotifs };
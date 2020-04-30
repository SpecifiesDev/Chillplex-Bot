const embeds = require("../embeds");



const togglenotifs = async (message) => {

    let ping = message.guild.roles.cache.find(role => role.name === "Ping");

    if(message.member.roles.cache.has(ping.id)) {
        await message.member.roles.remove(ping);
        await message.channel.send(embeds.embed("Toggled Off", "Notifications have been toggled off."));
    } else if(!message.member.roles.cache.has(ping.id)) {
        await message.member.roles.add(ping);
        await message.channel.send(embeds.embed("Toggled On", "Notifications have been toggled on."));
    }

}

const getHelp = () => {
    return `Usage: ~togglenotifs \nDescription: Command that will provide the user who sends the command the ping role.\n`;
}

module.exports = { togglenotifs: togglenotifs, getHelp: getHelp };
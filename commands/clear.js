
const embeds = require('../embeds');
const main = require("../index");



const clear = async (message, args, prefix) => {
    if(!args[1]) return await message.channel.send(embeds.embed("Invalid Arguments", `Usage:\n ${prefix}clear <messages-to-clear>`));
            
    let converted = parseInt(args[1]);

    if(isNaN(converted)) return await message.channel.send(embeds.embed("Improper Argument Passed", "The argument passed was invalid."));

    if(converted > 100) return await message.channel.send(embeds.embed("Parameter too large", "This command only allows you to bulk delete 100 messages at a time."));

    let mod = message.guild.roles.cache.find(role => role.name === "Mod");

    if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.has(mod)) {

        await message.channel.bulkDelete(converted);

        await message.channel.send(embeds.embed("Completed", `The bot has deleted ${converted} messages.`));

    } 
}

const getHelp = () => {
    return `Usage: ~clear <amount> \nDescription: Command to clear a specified amount of messages. \nParameters: [amount] Amount of messages to delete.\n`;
}




module.exports = { clear: clear, getHelp: getHelp };
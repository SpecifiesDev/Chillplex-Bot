
const embeds = require('../embeds');

const clear = async (message, args) => {
    if(!args[1]) return await message.channel.send(embeds.embed("Invalid Arguments", `Usage:\n ${prefix}clear <messages-to-clear>`));
            
    let converted = parseInt(args[1]);

    if(isNaN(converted)) return await message.channel.send(embeds.embed("Improper Argument Passed", "The argument passed was invalid."));

    if(converted > 100) return await message.channel.send(embeds.embed("Parameter too large", "This command only allows you to bulk delete 100 messages at a time."));

    let mod = message.guild.roles.cache.find(role => role.name === "Mod");

    if(message.member.hasPermission("ADMINISTRATOR")) {

        handleClear(message, converted);

    } else if(message.member.roles.has(mod)) {

        handlerClear(message,converted);
    }
}


const handleClear = async (message, deletion) => {


    await message.channel.bulkDelete(deletion);

    await message.channel.send(embeds.embed("Completed", `The bot has deleted ${deletion} messages.`));

}

module.exports = { clear: clear };
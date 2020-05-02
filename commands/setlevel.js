const embeds = require("../embeds");
const axios = require("axios");
const main = require("../index");

let baseAPI = "http://35.231.191.182/api/v1";

let levels = new Map();


const setlevel = async (message, args, prefix) => {

    let mod = message.guild.roles.cache.find(role => role.name === "Mod");

    // Let's do this to prevent redunant code
    levels.set("40", message.guild.roles.cache.find(role => role.name === "Level 40+"));
    levels.set("60", message.guild.roles.cache.find(role => role.name === "Level 60+"));
    levels.set("80", message.guild.roles.cache.find(role => role.name === "Level 80+"));
    levels.set("100", message.guild.roles.cache.find(role => role.name === "Level 100"));

    // Limit the command to staff
    if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.has(mod)) {

        
        
        // required arguments
        if(!args[1] || !args[2]) return await message.channel.send(embeds.embed("Invalid Arguments", `Usage:\n ${prefix}setlevel <discord-tag> <ign>`));

        // grab instance of queried user
        let user = message.guild.members.cache.get(message.mentions.users.first().id);
        
        // Query the API server for the players expearned
        let xpQuery = await axios.get(`${baseAPI}/stats/player/${args[2]}`);

        
        // Query the API server for the player's level
        let levelQuery = await axios.get(`${baseAPI}/utilities/calculation/level/${xpQuery.data.expearned.split(",").join("")}`);

        
        let level = levelQuery.data.level;

        if(!level == 0 && !level == 1) level--;

        if(level >= 40 && level < 60) {

            let level40role = levels.get("40");

            if(!user.roles.cache.has(level40role)) user.roles.add(level40role);

        } else if(level >= 60 && level < 80) {

            let previous = levels.get("40");
            let now = levels.get("60");

            if(user.roles.cache.has(previous)) user.roles.remove(previous);

            if(!user.roles.cache.has(now)) user.roles.add(now);

        } else if(level >= 80 && level < 100) {

            let previous = levels.get("60");
            let now = levels.get("80");

            if(user.roles.cache.has(previous)) user.roles.remove(previous);

            if(!user.roles.cache.has(now)) user.roles.add(now);

        } else if(level == 100) {
            
            let previous = levels.get("80");
            let now = levels.get("100");

            if(user.roles.cache.has(previous)) user.roles.remove(previous);

            if(!user.roles.cache.has(now)) user.roles.add(now);
        }

        await message.channel.send(embeds.embed("Role Added", `The user is level ${level} and has received the appropriate roles.`));
        

        
        
       

    } else {
        await message.channel.send(embeds.embed("Invalid Permission", "You must be a mod+ in order to use this command."));
    }

}

const getHelp = () => {
    return `Usage: ~setlevel <tag-of-user> <ign> \nDescription: Command to query a user's level and assign appropriate roles. \nParameters: [tag-of-user] The tag of the user in discord. [ign] The in game name of the user.\n`;
}

module.exports = { setlevel: setlevel, getHelp: getHelp };
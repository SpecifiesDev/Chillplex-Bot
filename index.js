const discord = require ("discord.js");
const axios = require("axios");
const fs = require("fs");

const embeds = require("./embeds");

const client = new discord.Client();

const prefix = "~";
const mee6url = "https://mee6.xyz/api/plugins/levels/leaderboard/";
const token = "";







client.on("ready", () => {
    console.log("Bot ready to serve");
    client.user.setActivity(`Serving commands with ${prefix}`);
});

client.on("message", async (message) => {

    let content = message.content;
    let guildId = message.guild.id;

    if(message.author.bot) return; // If the message is from the bot, there's no need to run the rest of these conditionals

    // If the message is a command
    console.log(content.indexOf(prefix));
    if(content.indexOf(prefix) == 0) {

        // Split the command for args
        const args = content.slice(prefix).trim().split(/ +/g);

        console.log(args);

        // Get the first object, set it to lower case
        const command = args[0];


        if(command === `${prefix}ping`) {
            const object = await message.channel.send("Calculating");
            await message.channel.send(embeds.embed("Pong.", `Response latency is ${object.createdTimestamp - message.createdTimestamp}ms.`));
            (await object).delete();
            return;
        }

        if(command === `${prefix}clear`) {
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
 


    } else {

        /*
        * Mee6 kind of just stores every user index one huge json array.
        * All we need to do is loop through it, place it in a hashmap for easy key-value grabbing
        * then check the configuration
        */
        axios.get(`${mee6url}${guildId}`).then(resp => {

            // As far as I can tell, the data is instantly updated. (Within 30 seconds of me sending a message in a freshly "created" guild, my xp was show on their api endpoint)
            
            
            // No need for checking for errors here, as axios will catch if the page returns a 404

            let data = resp.data;
            

            // Let's just toss it in a map for easier grabbing.
            let mappedData = new Map();

            for(index in data.players) {
                let player = data.players[index];

                mappedData.set(player.id, player.level);
            }

            let level = mappedData.get(message.author.id);

            // for now manual checks until I set up role configuration
            if(level > 0 && level <= 4) {

                let role = message.guild.roles.cache.find(role => role.name === "New Member!");
                if(message.member.roles.cache.has(role.id)) return;

                message.member.roles.add(role.id);

            } else if(level > 4 && level <= 9) {

                let newRole = message.guild.roles.cache.find(role => role.name === "Not totally new member");
                let oldRole = message.guild.roles.cache.find(role => role.name === "New Member!");

                if(message.member.roles.cache.has(oldRole.id)) message.member.roles.remove(oldRole.id);

                message.member.roles.add(newRole.id);

            } else if(level > 9 && level <= 19) {
                let newRole = message.guild.roles.cache.find(role => role.name === "OkAy? Ok");
                let oldRole = message.guild.roles.cache.find(role => role.name === "Not totally new member");

                if(message.member.roles.cache.has(oldRole.id)) message.member.roles.remove(oldRole.id);

                message.member.roles.add(newRole.id);
            } else if(level > 19 && level <= 29) {

                let newRole = message.guild.roles.cache.find(role => role.name === "oOooOOO");
                let oldRole = message.guild.roles.cache.find(role => role.name === "OkAy? Ok");

                if(message.member.roles.cache.has(oldRole.id)) message.member.roles.remove(oldRole.id);

                message.member.roles.add(newRole.id);
            } else if(level > 29 && level <= 39) {

                let newRole = message.guild.roles.cache.find(role => role.name === "Zoom Zoom");
                let oldRole = message.guild.roles.cache.find(role => role.name === "oOooOOO");

                if(message.member.roles.cache.has(oldRole.id)) message.member.roles.remove(oldRole.id);

                message.member.roles.add(newRole.id);
            }



            

            

        })
        .catch(err => {
            return console.log("a");
        });



    }
    

});

handleClear = async (message, deletion) => {


    await message.channel.bulkDelete(deletion);

    await message.channel.send(embeds.embed("Completed", `The bot has deleted ${deletion} messages.`));

}

client.login(token);
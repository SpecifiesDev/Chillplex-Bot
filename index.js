const discord = require ("discord.js");
const axios = require("axios");
const fs = require("fs");


const ping = require("./commands/ping");
const clear = require("./commands/clear");
const github = require('./commands/github');
const togglenotifs = require("./commands/togglenotifs");
const setlevel = require('./commands/setlevel');
const help = require("./commands/help");
const addrole = require('./commands/addrole');
const removerole = require('./commands/removerole');

const client = new discord.Client();

const prefix = "~";
const mee6url = "https://mee6.xyz/api/plugins/levels/leaderboard/";
const token = "";







client.on("ready", () => {
    console.log("Bot ready to serve");
    client.user.setActivity(`${prefix}help <command>`);
});

client.on("message", async (message) => {

    let content = message.content;
    let guildId = message.guild.id;

    if(message.author.bot) return; // If the message is from the bot, there's no need to run the rest of these conditionals

    // If the message is a command
    if(content.indexOf(prefix) == 0) {

        // Split the command for args
        const args = content.slice(prefix).trim().split(/ +/g);

        

        // Get the first object, set it to lower case
        const command = args[0];


        if(command === `${prefix}ping`) ping.ping(message);

        if(command === `${prefix}clear`) clear.clear(message, args, prefix);

        if(command === `${prefix}github`) github.github(message);
        
        if(command === `${prefix}togglenotifs`) togglenotifs.togglenotifs(message);
        
        if(command === `${prefix}setlevel`) setlevel.setlevel(message, args, prefix);
        
        if(command === `${prefix}addrole`) addrole.addrole(message, args, prefix);
        
        if(command === `${prefix}removerole`) removerole.removerole(message, args, prefix);
        
        if(command === `${prefix}help`) help.help(message, args);
 


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


module.exports = { prefix: prefix };

client.login(token);
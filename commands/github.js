const embeds = require('../embeds');
const main = require("../index");




// Experimental
const github = async (message) => {

    await message.channel.send(embeds.embed("Github Repository", "[Click Me](https://github.com/SpecifiesDev/Chillplex-Bot)"));

}

const getHelp = () => {
    return `Usage: ~github \nDescription: Will send an embed containing the link to the bot's repository.\n`;
}

module.exports = { github: github, getHelp: getHelp };
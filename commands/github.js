const embeds = require('../embeds');

// Experimental
const github = async (message) => {

    await message.channel.send(embeds.embed("Github repostiory: ", "[link](https://github.com/SpecifiesDev/Chillplex-Bot)"));

}

module.exports = { github: github };
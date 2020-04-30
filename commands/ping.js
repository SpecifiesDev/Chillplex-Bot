const embeds = require('../embeds');


const ping = async (message) => {
    const object = await message.channel.send("Calculating");
    await message.channel.send(embeds.embed("Pong.", `Response latency is ${object.createdTimestamp - message.createdTimestamp}ms.`));
    (await object).delete();
    return;
}

const getHelp = () => {
    return `Usage: ~ping \nDescription: The command will return an embed containing the average response latency.\n`;
}

module.exports = { ping: ping, getHelp: getHelp };
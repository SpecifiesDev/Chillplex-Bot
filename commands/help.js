const embeds = require("../embeds");

let commands = new Map();

commands.set("ping", require("./ping"));
commands.set("setlevel", require("./setlevel"));
commands.set("togglenotifs", require("./togglenotifs"));
commands.set("clear", require("./clear"));
commands.set("github", require("./github"));
commands.set("addrole", require("./addrole"));
commands.set("removerole", require("./removerole"));


const help = async (message, args) => {

    if(args[1] == undefined) {
        
        let build = [];

        for(const [key, value] of commands.entries()) {
            temp = ""
            temp += value.getHelp();
            build.push(embeds.embed(`Command: ${key}`, temp));
        }

        
        
        for(index in build) {
            let object = build[index];
            await message.member.send(object);
        }
        await message.channel.send(embeds.embed("Help sent", "Please check your dms."));
    } else {

        let object = commands.get(args[1]);

        if(object == undefined) return await message.channel.send(embeds.embed("Error", `The command "${args[1]}" doesn't exist.`));

        

        await message.member.send(embeds.embed(`Command: ${args[1]}`, object.getHelp()));
        await message.channel.send(embeds.embed("Help sent", "Please check your dms."));
    }

}


module.exports = { help: help };
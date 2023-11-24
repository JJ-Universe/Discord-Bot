module.exports = {
    name: 'eval',
    description: 'Executes JavaScript code',
    developerOnly: true,

    run: async (client, message, args) => {
        if (!args.length) return message.channel.send('You need to provide some code to evaluate!');
        let code = args.join(' ');

        let evaled;
        try {
            evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
const { Collection } = require("discord.js");

const cooldowns = new Collection();

function handleCooldown(user, command) {
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps && timestamps.has(user.id)) {
        const expirationTime = timestamps.get(user.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`;
        }
    }

    if (!timestamps) {
        cooldowns.set(command.name, new Collection());
    }

    cooldowns.get(command.name).set(user.id, now);
    setTimeout(() => cooldowns.get(command.name).delete(user.id), cooldownAmount);
}

module.exports = handleCooldown;
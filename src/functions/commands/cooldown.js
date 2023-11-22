const { Collection } = require("discord.js");

const cooldowns = new Collection();

function handleCooldown(user, command) {
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(user.id)) {
        const expirationTime = timestamps.get(user.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`;
        }
    }

    timestamps.set(user.id, now);
    setTimeout(() => timestamps.delete(user.id), cooldownAmount);
}

module.exports = handleCooldown;
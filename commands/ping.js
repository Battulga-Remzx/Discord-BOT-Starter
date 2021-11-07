const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

const talkedRecently = new Set();

const cooldown = new Set();

exports.execute = (client, message, args) => {
    let gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send("Pinging...").then(m => {
        const f = client.emojis.cache.find(emoji => emoji.name === "errorbot");
      const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
         if (cooldown.has(message.author.id)) {
      message.delete();
     return message.channel.send(
      `${f} || **Você precisa esperar 5 minutos para usar esse comando!**`
    ); }
  else {     //esse else tem valor de AI
    cooldown.add(message.author.id); //aqui ele tem valor se nao
    setTimeout(() => {
    cooldown.delete(message.author.id);
  },  1000 * 10)
  }
      const embed = new MessageEmbed()
            .setTitle("Pong!")
            .addField("API Latency", `${gatewayLatency}ms`, true)
            .addField("Client Latency", `${trip}ms`, true)
            .setColor("#7289DA")
            .setTimestamp();
        m.edit(embed);
    });
}

exports.help = {
    name: "ping",
    aliases: ["pong", "latency"],
    usage: `ping`
}

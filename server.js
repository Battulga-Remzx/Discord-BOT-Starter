const { Client } = require("discord.js");
const client = new Client({ intents: 513 });
const zero = require('chatbot-zero')
var ai = new zero()
client.on("ready", () => {
  console.log("Ready for chatting!| Bot by 0_0");
});
client.on("message", async message => {
  // when client detects a message
  if (message.author.bot) return; // if the author of the message is a bot ignore the case
  message.content = message.content
    .replace(/@(everyone)/gi, "everyone")
    .replace(/@(here)/gi, "here");
  if (message.content.includes(`@`)) {
    return message.reply(
      `**:x: Please dont mention anyone while talking to me I feel attacked 😭**`
    );
  }
  message.channel.startTyping();
  if (!message.content)
    return message.channel.send("I can only reply to text messages");
  ai.chat({
    message: message.content,
    name: client.user.username,
    owner: "Zero", // Add Owner Name Here
    user: message.author.id,
    language: "en" // You can change the language here ( auto ) states it will detect your language and prepare a response in english for you
  }).then(reply => {
    message.reply({
      embed: {
        title: "ChatBot",
        color: "#5539cc",
        description: `**${reply}**`,
        timestamp: new Date(),
        footer: {
          text: `${client.user.username}`
        }
      }
    });
  });
  message.channel.stopTyping();
});
client.login(process.env.TOKEN); //login using the token

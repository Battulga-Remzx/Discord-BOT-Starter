const Discord = require('discord.js')

const client = new Discord.Client({})

client.config = require('./config')

client.login(client.config.token)

require('./server')()
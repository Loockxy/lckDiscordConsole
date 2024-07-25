const Discord = require('@citizenfx/discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders");
const intents = new Discord.Intents(53608447)
const client = new Discord.Client({partials: ["CHANNEL"], intents: intents})
const config = require('./modules/bot/config.json');

const consoleCmd = new SlashCommandBuilder()
.setName("console")
.setDescription("Cette commande vous permez d'éxécuter une commande sur votre console de votre serveur FiveM")
.addStringOption(options =>
    options.setName("commande")
    .setDescription("La commande que vous voulez éxécuter sur votre serveur FiveM")
    .setRequired(true)
);

client.on("ready", () => {
    console.log(`${client.user.tag} est connecter`)
                	
    client.application.commands.create(consoleCmd)
})

client.on("interactionCreate", interaction => {
    if(!interaction.isCommand) return;
    if(interaction.user.id !== config.owner) return;
                                 
    if(interaction.commandName === "console") {
        const cmd = interaction.options.getString("commande")
                                                    
        ExecuteCommand(cmd)
                                                                    
        interaction.reply("La commande a bien été envoyer et éxécuter dans la console de votre serveur FiveM")
    }
})

client.login(config.token)
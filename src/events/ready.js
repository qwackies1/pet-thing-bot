const { ActivityType } = require('discord.js')
const mongoose = require('mongoose')
const mongoDBurl = process.env.MONGODBURL

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        if (!mongoDBurl) return;

        await mongoose.connect(mongoDBurl || '',{
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        if (mongoose.connect) {
            console.log('>>> [Database] Successfully connected to MongoDB.')
        }

        await client.user.setPresence({
            activities: [{
                name: `/help | v1.0.0`,
                type: ActivityType.Watching
            }],
            status: 'online'
        })
    },
};
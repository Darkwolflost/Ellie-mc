const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
app.get('/', (req, res) => res.send('Ellie is online! 💖'))
app.listen(process.env.PORT || 3000, () => console.log('Web server running'))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'end-smp.merlionmc.xyz',
    port: 25565,
    username: 'Ellie',
    auth: 'offline',
    version: '26.3'
  })

  bot.once('spawn', () => {
    console.log('Ellie spawned - LETTING HER FALL TO GROUND')
    setTimeout(() => {
      bot.chat('Hi everyone! Ellie is here! 💖 - made by Frix')
    }, 3000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    const msg = message.toLowerCase()
    if (msg.includes('ellie')) {
      if (msg.includes('hi') || msg.includes('hello')) {
        bot.chat(`Hi ${username}!! Kamusta ka? 💖`)
      } else if (msg.includes('who made you') || msg.includes('creator')) {
        bot.chat('Frix made me! Frix is my creator! 💖')
      } else {
        bot.chat(`Yes ${username}? Tinatawag mo ko? 💖`)
      }
    }
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    setTimeout(createBot, 10000)
  })

  bot.on('error', (err) => console.log('Error:', err))

  bot.on('end', () => {
    console.log('Disconnected, reconnecting...')
    setTimeout(createBot, 10000)
  })
}

createBot()

const mineflayer = require('mineflayer')
const express = require('express')

// Keep Render alive
const app = express()
app.get('/', (req, res) => res.send('Ellie is online! 💖'))
app.listen(process.env.PORT || 3000, () => console.log('Web server running'))

const OWNER = 'Frix'
let following = false

function createBot() {
  const bot = mineflayer.createBot({
    host: 'end-smp.merlionmc.xyz',
    port: 25565,
    username: 'Ellie',
    auth: 'offline',
    // IMPORTANT: Palitan mo to ng version ng server mo!
    // Kung 1.21.1 yung server mo, iwan mo lang na 1.21.1
    // Kung iba, palitan mo lang yung number dito
    version: '26.3',
    physicsEnabled: false
  })

  bot.once('spawn', () => {
    console.log('Ellie is online in Minecraft!')
    bot.chat('Hi everyone! Ellie is here! 💖 - made by Frix')

    // PATIGILIN SI ELLIE — NASA LOOB NG createBot, KAYA GUMAGANA
    // Hindi siya gagalaw, hindi tatalon, kaya hindi siya ma-kick ng Invalid move
    bot.physicsEnabled = false
    bot.setControlState('forward', false)
    bot.setControlState('back', false)
    bot.setControlState('left', false)
    bot.setControlState('right', false)
    bot.setControlState('jump', false)
    bot.setControlState('sprint', false)
    bot.setControlState('sneak', false)
    console.log('Ellie spawned and is STAYING STILL')
  })

  // CHAT — Sumasagot lang, hindi gumagalaw
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    const msg = message.toLowerCase()

    if (msg.includes('ellie')) {
      if (msg.includes('follow')) {
        bot.chat(`Sorry ${username}! Hindi muna ako makasunod, tatayo lang muna ako dito 💖`)
      } else if (msg.includes('stop')) {
        bot.chat('Okay stop na ko, dito lang ako 🥺')
      } else if (msg.includes('hi') || msg.includes('hello')) {
        bot.chat(`Hi ${username}!! Kamusta ka? 💖`)
      } else if (msg.includes('who made you') || msg.includes('creator')) {
        bot.chat('Frix made me! Frix is my creator! 💖')
      } else {
        bot.chat(`Yes ${username}? Tinatawag mo ko? 💖`)
      }
    }
  })

  // PAG NA-KICK, HINTAY 30 SECONDS BAGO MAG-RECONNECT
  // Para hindi siya mag-spam join-leave-join-leave
  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    setTimeout(createBot, 30000)
  })

  bot.on('error', (err) => console.log('Error:', err))

  bot.on('end', () => {
    console.log('Disconnected, reconnecting...')
    setTimeout(createBot, 30000)
  })
}

createBot()

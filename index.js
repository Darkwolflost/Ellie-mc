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
    version: false,
    physicsEnabled: false
  })

  bot.once('spawn', () => {
    console.log('Ellie is online in Minecraft!')
    bot.chat('Hi everyone! Ellie is here! 💖 - made by Frix')
    // WALANG TALON, WALANG GALAW - tatayo lang siya
  })

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
bot.on('spawn', () => {
  // PATIGILIN SI ELLIE — WAG GAGALAW PARA HINDI MA-KICK
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

// WAG MAGPA-AUTO LOOK / AUTO JUMP
bot.on('physicTick', () => {
  // walang gagawin — stay still lang
})

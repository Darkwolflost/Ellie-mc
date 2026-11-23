const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const express = require('express')
const GoalFollow = goals.GoalFollow

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
  })

  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    console.log('Ellie is online in Minecraft!')
    bot.chat('Hi everyone! Ellie is here! 💖 - made by Frix')
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    const msg = message.toLowerCase()
    if (msg.includes('ellie')) {
      if (msg.includes('follow')) {
        following = true
        bot.chat(`Okay ${username}! Susundan na kita! 💖`)
      } else if (msg.includes('stop')) {
        following = false
        bot.pathfinder.setGoal(null)
        bot.chat('Okay stop na ko, dito lang ako 🥺')
      } else if (msg.includes('hi') || msg.includes('hello')) {
        bot.chat(`Hi ${username}!! Kamusta ka? 💖`)
      } else if (msg.includes('who made you') || msg.includes('creator')) {
        bot.chat('Frix made me! Frix is my creator! 💖')
      } else {
        bot.chat(`Yes ${username}? Tinatawag mo ko? 💖`)
      }
    }
    if (following) {
      const target = bot.players[username]?.entity
      if (target) {
        const mcData = require('minecraft-data')(bot.version)
        const movements = new Movements(bot, mcData)
        bot.pathfinder.setMovements(movements)
        bot.pathfinder.setGoal(new GoalFollow(target, 2, true), true)
      }
    }
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    setTimeout(createBot, 5000)
  })
  bot.on('error', (err) => console.log('Error:', err))
  bot.on('end', () => {
    console.log('Disconnected, reconnecting...')
    setTimeout(createBot, 5000)
  })
}

createBot()

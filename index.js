const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: parseInt(process.env.MC_PORT || '25565'),
    username: 'Ellie',
    version: process.env.MC_VERSION || '1.21.1',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('Ellie joined!')
    bot.chat('Hi everyone! Ellie is here! - made by Frix')
    // Huwag gagalaw para hindi ma-kick ni PaperBPM
    bot.setControlState('forward', false)
    bot.setControlState('back', false)
    bot.setControlState('left', false)
    bot.setControlState('right', false)
    bot.setControlState('jump', false)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message.toLowerCase().includes('hi ellie')) {
      bot.chat(`Hi ${username}!`)
    }
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err.message)
  })

  bot.on('end', () => {
    console.log('Bot disconnected, retry in 10s...')
    // 10 seconds bago bumalik, para hindi spam
    setTimeout(startBot, 10000)
  })
}

startBot()

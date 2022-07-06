import {createBot} from 'mineflayer'

const bot = createBot({
    host: 'hypixel.net',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    auth: 'microsoft',
    version: '1.8.9'
})

bot.once('spawn', () => {
    setInterval(async () => {
        bot.setControlState('jump', true)
        await bot.waitForTicks(11)
        bot.clearControlStates()
    }, 10000)
})

export function warp(plr){
    bot.chat(`/party invite ${plr}`)
}

bot.on('message', (msg) => {
    let messages = [msg]
    if(msg.extra != null) messages.push(...msg.extra)

    let nonWhite = messages.filter(e =>
        e.color !== 'white'
    ).map(e => e.text)

    if(nonWhite.includes('joined the party.')){
        bot.chat('/p warp')
    }else if(nonWhite.includes('Some players are still in-game, run the command again to confirm warp!')){
        setTimeout(() => {
            bot.chat('/p warp')
        }, 500)
    }else if(nonWhite.includes('You summoned ')){
        setTimeout(() => {
            bot.chat('/p disband')
        }, 500)
    }
})

bot.on('message', (msg) => {
    console.log(msg.toAnsi())
})

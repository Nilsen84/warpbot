import {createBot} from 'mineflayer'

export default class {
    constructor(username, password) {
        this.bot = createBot({
            host: 'hypixel.net',
            username: username,
            password: password,
            auth: 'microsoft',
            version: '1.8.9'
        })

        this.bot.once('spawn', () => {
            setInterval(async () => {
                this.bot.setControlState('jump', true)
                await this.bot.waitForTicks(11)
                this.bot.clearControlStates()
            }, 10000)
        })

        this.bot.on('message', (msg) => {
            let messages = [msg]
            if(msg.extra != null) messages.push(...msg.extra)

            let nonWhite = messages.filter(e =>
                e.color !== 'white'
            ).map(e => e.text)

            if(nonWhite.includes('joined the party.')){
                this.bot.chat('/p warp')
            }else if(nonWhite.includes('Some players are still in-game, run the command again to confirm warp!')){
                setTimeout(() => {
                    this.bot.chat('/p warp')
                }, 500)
            }else if(nonWhite.includes('You summoned ')){
                setTimeout(() => {
                    this.bot.chat('/p disband')
                }, 500)
            }
        })

        this.bot.on('message', (msg) => {
            console.log(msg.toAnsi())
        })
    }

    warp(plr){
        this.bot.chat(`/party invite ${plr}`)
    }
}
import dotenv from 'dotenv'
dotenv.config()

import WarpBot from './bot.js';
import {Tail} from "tail";

const bot = new WarpBot(
    process.env.EMAIL,
    process.env.PASSWORD
)

const opponentRegex = /\[Client thread\/INFO]: \[CHAT] \s+Opponent:.* (.+)$/
const tail = new Tail(process.env.LOGFILE, {
    useWatchFile: process.platform === 'win32'
})

tail.on('line', line => {
    const match = opponentRegex.exec(line)

    if(match){
        bot.warp(match[1])
    }
})
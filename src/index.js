import dotenv from 'dotenv'
dotenv.config()

import * as bot from './bot.js';
import {Tail} from "tail";

const opponentRegex = /\[Client thread\/INFO]: \[CHAT] \s+Opponent:.* (.+)$/

const tail = new Tail(process.env.LOGFILE)

tail.on('line', line => {
    const match = opponentRegex.exec(line)

    if(match){
        bot.warp(match[1])
    }
})
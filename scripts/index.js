import './chat'
import './combat'
import './commands'
import './display'
import './functions'
import './spawn'






import * as Minecraft from "@minecraft/server"
import * as MinecraftUi from "@minecraft/server-ui"

let moneyObjective = "money"
let prefix = "!"

//Made by DerCoderJo
Minecraft.world.events.beforeChat.subscribe((data) => {
    if(data.message.toLowerCase().startsWith(`${prefix}pay`)){
        data.cancel = true
        let money = Minecraft.world.scoreboard?.getObjective(moneyObjective)?.getScore(data.sender.scoreboard) ?? 0
        if(money <= 1 || !money) return data.sender.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §cYou need more than §l1 §r§cMoney!§r"}]}`)

        let players = []
        for(let player of Minecraft.world.getPlayers()){
            if(player.nameTag !== data.sender.nameTag) players.push(player.name)
        }
        if(!players[0]) return data.sender.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §cNo one is online :(§r"}]}`)
        let modal = new MinecraftUi.ModalFormData()
        .title("§r§aMoney §eTransfer§r")
        .dropdown("Select a Player", players)
        .slider("How much Money did you want to Transfer?", 1, money, 1)
        .textField("Greeting", "Thanks for the Dirt!")
        let player = data.sender
        player.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §6You have 5 seconds to close the Chat that the UI can Open.§r"}]}`)
        
        setTickTimeout(() => {
            modal.show(player).then((res) => {
                if(res.isCanceled == true) return player.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §cCanceled Money Transfer!§r"}]}`)
                let selectedPlayer = players[res.formValues[0]]
                let greet;
                if(res.formValues[2]) greet = ` with this greeting: ${res.formValues[2]}`
                else greet = "."
                let found = false
                for(let playe of Minecraft.world.getPlayers()){
                    if(playe.name == selectedPlayer){
                        found = true
                        player.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §bYou have successfully transferred §l§9${playe.name} §a${res.formValues[1]} Money§r§b${greet}§r"}]}`)
                        playe.runCommandAsync(`scoreboard players add @s ${moneyObjective} ${res.formValues[1]}`)
                        player.runCommandAsync(`scoreboard players remove @s ${moneyObjective} ${res.formValues[1]}`)
                        playe.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §l§9${player.name} §r§bhas successfully transferred §a§l${res.formValues[1]} Money §r§bto you${greet}§r"}]}`)
                    }
                }
                if(found == false) return player.runCommandAsync(`tellraw @s {"rawtext": [{"text": "§r§8[§aMoney §eTransfer§8] §c§l${selectedPlayer} §r§chas left the game.§r"}]}`)
            })
        }, 100)
    }
})
//Made by DerCoderJo
Minecraft.system.run(function tick(){
    Minecraft.system.run(tick)


    try{
        for(let data of Minecraft.world.scoreboard.getObjective("moneyTransfer").getParticipants()) if(data.displayName.startsWith("objective:")) moneyObjective = data.displayName.replace("objective:", "") ?? "money"
        else if(data.displayName.startsWith("prefix:")) prefix = data.displayName.replace("prefix:", "").replace("\\\\", "\\") ?? "!"
    }catch{
        Minecraft.world.getDimension("overworld").runCommandAsync(`scoreboard objectives add moneyTransfer dummy "Money Transfer - Data"`)
        Minecraft.world.getDimension("overworld").runCommandAsync(`scoreboard players set "objective:money" moneyTransfer 1`)
        Minecraft.world.getDimension("overworld").runCommandAsync(`scoreboard players set "prefix:!" moneyTransfer 1`)
    }
    
    for(let player of Minecraft.world.getPlayers()) if(player.hasTag("moneyTransfer:settings")){
        player.removeTag("moneyTransfer:settings")
        
        new MinecraftUi.ModalFormData()
        .title("§r§aMoney §eTransfer §8- §7Settings§r")
        .textField("Money Objective", "money", moneyObjective)
        .textField("Prefix", "!", prefix)
        .show(player).then((res) => {
            if(res.isCanceled) return

            try{player.runCommandAsync(`scoreboard players reset "objective:${moneyObjective}"`)}catch{}
            player.runCommandAsync(`scoreboard players set "objective:${res.formValues[0]}" moneyTransfer 1`)
            moneyObjective = res.formValues[0]

            try{player.runCommandAsync(`scoreboard players reset "prefix:${prefix}"`)}catch{}
            player.runCommandAsync(`scoreboard players set "prefix:${res.formValues[1].replace("\\", "\\\\")}" moneyTransfer 1`)
            prefix = res.formValues[0]
        })
    }
})
//Made by DerCoderJo
Minecraft.system.events.beforeWatchdogTerminate.subscribe((data) => data.cancel = true)


function setTickTimeout(callback, tick){
    let ticks = 0
    let TickCallBack = Minecraft.world.events.tick.subscribe(() => {
        ticks += 1
        
        if(ticks == tick){
            callback()
            Minecraft.world.events.tick.unsubscribe(TickCallBack)
        }
    })
}

function getScore(target, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? oB.getParticipants().find(pT => pT.displayName == target) : target.scoreboard)
    } catch {
        return NaN
    }
}
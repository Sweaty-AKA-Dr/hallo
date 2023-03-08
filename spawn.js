import { system, world } from '@minecraft/server'
import { getScore } from './functions'

world.events.playerSpawn.subscribe((data) => {
  const player = data.player
  const initial_spawn = data.initialSpawn
  if (initial_spawn) {
    player.teleport({ x: 0.5, y: 251, z: 0.5 }, player.dimension, player.rotation.x, player.rotation.y)
    player.runCommandAsync('gamemode adventure')
  } else if (initial_spawn && player.hasTag('in_combat')) {
    player.addTag('warn')
    player.tell('§l§cYou have been warned for combat logging!')
  } else if (initial_spawn && player.hasTag('ban')) {
    player.runCommandAsync(`kick ${player.name} §cYou have been banned from Legends Skygen.`)
    world.say(`§l§f${player.name} §chas tried joining while they're banned.`)
  }
})

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    if (!player.hasTag('admin') && Math.abs(player.velocity.x) == 0 && Math.abs(player.velocity.z) == 0) player.runCommandAsync('scoreboard players add @s afkTimer 1')
    else player.runCommandAsync('scoreboard players set @s afkTimer 0')
    if (getScore(player, 'afkTimer') == 3000) player.tell('You will be kicked in 2 and a half minutes.')
    if (getScore(player, 'afkTimer') == 5900) player.onScreenDisplay.setActionBar('You will be kick in 5...')
    if (getScore(player, 'afkTimer') == 5920) player.onScreenDisplay.setActionBar('You will be kick in 4...')
    if (getScore(player, 'afkTimer') == 5940) player.onScreenDisplay.setActionBar('You will be kick in 3...')
    if (getScore(player, 'afkTimer') == 5960) player.onScreenDisplay.setActionBar('You will be kick in 2...')
    if (getScore(player, 'afkTimer') == 5980) player.onScreenDisplay.setActionBar('You will be kick in 1...')
    if (getScore(player, 'afkTimer') >= 6000) {
        world.say(`§l§f${player.name} §chas been kicked for being AFK.`)
        player.runCommandAsync(`kick ${player.name} §cYou have been kicked for being AFK.`)
        player.runCommandAsync('scoreboard players set @s afkTimer 0')
    }
  })
})
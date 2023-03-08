import { world } from '@minecraft/server'

const prefix = '+'
world.events.beforeChat.subscribe((data) => {
  let player = data.sender
  let message = data.message
  if (message.startsWith(prefix)) {
    data.cancel = true
    switch (message.slice(1).toLowerCase()) {
      case 'survival':
        if (player.hasTag('admin')) {
          player.runCommandAsync('gamemode survival')
        } else player.tell('§cMissing permissions. [Admin]')
        break
      case 'adventure':
        if (player.hasTag('admin')) {
          player.runCommandAsync('gamemode adventure')
        } else player.tell('§cMissing permissions. [Admin]')
        break
      case 'creative':
        if (player.hasTag('admin')) {
          player.runCommandAsync('gamemode creative')
        } else player.tell('§cMissing permissions. [Admin]')
        break
      case 'spectator':
        if (player.hasTag('admin')) {
          player.runCommandAsync('gamemode spectator')
        } else player.tell('§cMissing permissions. [Admin]')
        break
      case 'help':
        player.addTag('help')
        break
      case 'rules':
        player.addTag('rules')
        break
      case 'credits':
        player.addTag('credits')
        break
      case 'spawn':
        if (!player.hasTag('in_combat')) player.addTag('spawn')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'shop':
        if (!player.hasTag('in_combat')) player.addTag('shop')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'sell':
        if (!player.hasTag('in_combat')) player.addTag('sell')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'plots':
        if (!player.hasTag('in_combat')) player.addTag('plots')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'donation':
        if (!player.hasTag('in_combat')) player.addTag('dono')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'enchant':
        if (!player.hasTag('in_combat')) player.addTag('ench')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'customcrafting':
        if (!player.hasTag('in_combat')) player.addTag('ccrafting')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'misc':
        if (!player.hasTag('in_combat')) player.addTag('misc')
        else if (player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        break
      case 'nightvision':
        if (!player.hasTag('nightvision')) {
          player.addTag('nightvision')
          player.tell('§l§bNight Vision §7was enabled.')
        } else if (player.hasTag('nightvision')) {
          player.removeTag('nightvision')
          player.tell('§l§bNight Vision §7was disabled.')
        }
        break
      case 'feed':
        player.runCommandAsync('effect @s saturation 1 255 true')
        player.tell('§l§7Your §ehunger §7has been restored.')
        break
      case 'vip':
        if (player.hasTag('vip') && !player.hasTag('in_combat')) player.addTag('vipsell')
        else if (player.hasTag('vip') && player.hasTag('in_combat')) player.tell('§cYou must be out of combat before using this command.')
        else player.tell('§cMissing permissions. [Vip]')
        break
      case 'adminchat':
        if (player.hasTag('admin') && !player.hasTag('adminchat')) {
          player.addTag('adminchat')
          player.tell('§8[§6Skygen§8] §7You have enabled the §4Admin §7chat.')
        } else if (player.hasTag('admin') && player.hasTag('adminchat')) {
          player.removeTag('adminchat')
          player.tell('§8[§6Skygen§8] §7You have disabled the §4Admin §7chat.')
        } else player.tell("§8[§6Skygen§8] §cYou don't have permission to be using this command.")
        break
      default:
        player.tell(`§l§c${message}§r is an unavailable command!\n§bTry '+help' for more information.`)
        break
    }
  }
})
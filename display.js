import { system, world } from '@minecraft/server'
import { getScore, metricNumbers } from './functions'

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    const money = metricNumbers(getScore(player, 'money'))
    const time = metricNumbers(getScore(player, 'hr'))
    const kills = metricNumbers(getScore(player, 'Kills'))
    const deaths = metricNumbers(getScore(player, 'Deaths'))
    const kdr = getScore(player, 'KDR')
    const kdr_decimals = getScore(player, 'KDR-Decimals')
    player.onScreenDisplay.setTitle(` §fName §c-\n§b ${player.name}\n §fBalance §c-\n §a$§b${money}\n §fTime Played §c-\n §b${time} Hours\n §fKills §c-\n §b${kills}\n §fDeaths §c-\n §b${deaths}\n/ §fK/D §c-\n §b${kdr}.${kdr_decimals}%\n §f---------------\n §bRealm Info\n§f ---------------\n §fRealm Code §c-\n §8[§bJG8rwHwx3_s§8]\n §fDiscord Code §c-\n §8[§bceQPkvrJpr§8]`)
  })
})
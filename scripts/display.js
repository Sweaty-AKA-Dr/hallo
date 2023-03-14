import { system, world } from "@minecraft/server";
import { getScore, metricNumbers } from "./functions";

system.runInterval(() => {
  [...world.getPlayers()].forEach((player) => {
    const money = metricNumbers(getScore(player, "money"));
    const time = metricNumbers(getScore(player, "hr"));
    const kills = metricNumbers(getScore(player, "Kills"));
    const deaths = metricNumbers(getScore(player, "Deaths"));
    const kdr = getScore(player, "KDR");
    const kdr_decimals = getScore(player, "KDR-Decimals");
    const members = metricNumbers(getScore(player, "Members"));
    const players = getScore(player, "POnline");
    player.onScreenDisplay.setTitle(
      `§b§lLegends Skygen§r\n\n§9§l${player.name}\n §fBalance §c-\n  §a$§b${money}\n §fK/D §c-\n §b${kdr}.${kdr_decimals}%\n\n §fRealm Code §c-\n §8[§bJG8rwHwx3_s§8]\n §fDiscord Code §c-\n §8[§bceQPkvrJpr§8]`
    );
    player.onScreenDisplay.setActionBar(
      `§l§c§c§f Total Members §c-§b ${members} \n§c §fPlayers Online§c - §b ${players}/11§e\n Game Version 1.10.0\n(Anti C-Log)\n§7§oDo +help to see the \ncommand list`
    );
  });
});

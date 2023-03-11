import { system, world } from "@minecraft/server";

function getScore(target, value, useZero = true) {
  try {
    const objective = world.scoreboard.getObjective(value);
    if (typeof target == "string")
      return objective.getScore(
        objective
          .getParticipants()
          .find((player) => player.displayName == target)
      );
    return objective.getScore(target.scoreboard);
  } catch {
    return useZero ? 0 : NaN;
  }
}

function metricNumbers(value) {
  const types = ["", "k", "M", "B"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(2) + types[selectType];
}

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    const money = metricNumbers(getScore(player, "money"));
    const Hours = metricNumbers(getScore(player, "hr"));
    const chips = metricNumbers(getScore(player, "Kills"));
    const members = metricNumbers(getScore(player, "Members"));
    player.onScreenDisplay.setTitle(
      `§aCraft §2Theft §fAuto\n----------------\n§d§lProfile Stats:\n§r§6Name§7§l>§r${player.name}\n§aBank§l§7>§r §2$§a${money}\n§bHours Played§7§l> §e${hours}\n§r§dCasino §eChips§l§7>§r §e${chips}\n§cRank§7§l>§r ${rank}\n----------------\n§l§bRealm Info:\n§aRealm Code: §7§l>\n§r§eZDdvUn7ojpk\n§9Discord §7§l>\n§r§esET42tr7pp\n----------------\n§9§lPlayers Online:\n§r§7Online: §b${members}`
    );
  });
});

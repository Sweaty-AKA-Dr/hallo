import { world, system } from "@minecraft/server";

System.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    if (!player.hastag("Admin")) {
      player.runCommandAsync(
        `execute as @a[m=creative] run kick ${player.name} Illegal Gamemode Detected`
      );
      world.say(
        `§l§f${player.name} §r§cHas Been Kicked For Entering An §4§lIllegal Gamemode`
      );
    }
  });
});

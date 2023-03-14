import { world } from "@minecraft/server";
import { getScore, metricNumbers } from "./functions";

const rank_prefix = "rank:";
const default_rank = "Member";
function getRanks(player) {
  const ranks = player
    .getTags()
    .map((v) => {
      if (!v.startsWith(rank_prefix)) return null;
      return v.substring(rank_prefix.length);
    })
    .filter((x) => x);
  return ranks.length == 0 ? [default_rank] : ranks;
}

world.events.beforeChat.subscribe((data) => {
  data.cancel = true
  data.sendToTargets = true;
  data.targets() = [];
  const player = data.sender;
  const message = data.message;
  const hours = String(getScore(player, "hr") + "H");
  const money = metricNumbers(getScore(player, "money"));
  const ranks = getRanks(player);
  if (player.hasTag("adminchat")) {
    overworld.runCommandAsync(
      `tellraw @a[tag=admin] {"rawtext":[{"text":"§8[§4Admin§8] §7${player.name}: §f${message}"}]}`
    );
  } else
    world.sendMessage(
      `§8[§b${hours}§8] [§a${money}§8] [§f${ranks}§8] §7${player.name}: §f${message}`
    );
});


```
Step 1) Copy EVERYTHING from the chat event.
Step 2) Delete everything inside of the beforeChat event and paste new code.
Step 3) At the top of the new beforeChat event add data.cancel = true
Step 4) Delete the old chat event.
```
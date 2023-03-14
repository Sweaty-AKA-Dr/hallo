import { system, world, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { getScore, metricNumbers } from "./functions";

world.events.beforeItemUse.subscribe((data) => {
  let player = data.source;
  let item = data.item;

  if (item.typeId === "minecraft:clock") {
    player.runCommandAsync("playsound note.bell ${player.name}");
    page1(player);
  }
});

function page1(player) {
  const form = new ActionFormData();
  form.title("§eLegends §8GUI");
  form.button("§9Warps");
  form.button("§dHelp");
  form.button("§4Rules");
  form.button("§6Credits");
  form.button("§2Money Transfer");
//form.button("§bStats");
  form.button("§4§lClose");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      page2(player);
    }
    if (response.selection == 1) {
      player.addTag("help");
    }
    if (response.selection == 2) {
      player.addTag("rules");
    }
    if (response.selection == 3) {
      player.addTag("credits");
    }
    if (response.selection == 4) {
      page5(player);
    }
    if (response.selection == 5) {
      page6(player);
    }
    if (response.selection == 5) {
      player.tell("§4§lClosed GUI");
    }
  });
}

function page2(player) {
  const form = new ActionFormData();
  form.title("§eLegends §8GUI");
  form.button("§aSpawn");
  form.button("§aPlots");
  form.button("§aShop");
  form.button("§aSell");
  form.button("§6Last Page §8<-");
  form.button("§6Next Page §8->");
  form.button("§4§lClose");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.addTag("spawn");
    }
    if (response.selection == 1) {
      player.addTag("plots");
    }
    if (response.selection == 2) {
      player.addTag("shop");
    }
    if (response.selection == 3) {
      player.addTag("sell");
    }
    if (response.selection == 4)
      page1(player)
    if (response.selection == 5) {
      page3(player);
    }
    if (response.selection == 6) {
      player.tell("§4§lClosed GUI");
    }
  });
}

function page3(player) {
  const form = new ActionFormData();
  form.title("§eLegends §8GUI");
  form.button("§aDonations");
  form.button("§aMisc Shop");
  form.button("§aParkour");
  form.button("§6Last Page §8<-");
  form.button("§6Next Page §8->");
  form.button("§4§lClose");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.addTag("dono");
    }
    if (response.selection == 1) {
      player.addTag("misc");
    }
    if (response.selection == 2) {
      player.addTag("parkour");
    }
    if (response.selection == 3) {
      page2(player);
    }
    if (response.selection == 4) {
      page4(player);
    }
    if (response.selection == 5) {
      player.tell("§4§lClosed GUI");
    }
  });
}
function page4(player) {
  const form = new ActionFormData();
  form.title("§eLegends §8GUI");
  form.button("§aCustom Crafting");
  form.button("§aEnchants");
  form.button("§6Last Page §8<-");
  form.button("§4§lClose");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.addTag("ccrafting");
    }
    if (response.selection == 1) {
      player.addTag("ench");
    }
    if (response.selection == 2) {
      page3(player);
    }
    if (response.selection == 3) {
      player.tell("§4§lClosed GUI");
    }
  });
}

Object.defineProperty(Player.prototype, "scores", {
  get() {
    const player = this;
    return new Proxy(
      {},
      {
        get(_, property) {
          try {
            return world.scoreboard
              .getObjective(property.toString())
              .getScore(player.scoreboard);
          } catch {
            return NaN;
          }
        },
        set(_, property, value) {
          player.runCommandAsync(
            `scoreboard players set @s "${property}" ${value}`
          );
          return true;
        },
      }
    );
  },
});

async function page5(player) {
  const allPlayers = world.getAllPlayers().map((plr) => plr.name);
  const response = await new ModalFormData()
    .title("§2Money Transfer")
    .dropdown("Select a Player", allPlayers)
    .textField(`Please insert the amount to transfer`, "Amount goes here...")
    .show(player);
  if (response.canceled) return;
  const target = world
    .getAllPlayers()
    .find((plr) => plr.name === allPlayers[response.formValues[0]]);
  if (target.name === player.name)
    return player.tell(
      "§l§eYou Cant Send Money To Yourself. Why Would You Need To?"
    );
  if (!target) return player.tell("Player left the game!");
  const amount = parseInt(response.formValues[1]);
  if (isNaN(amount) || amount > player.scores["money"])
    return player.tell("§cInsufficient Funds!");
  player.scores["money"] -= amount;
  target.scores["money"] += amount;
  player.tell(`§bYou Have Sent §a$${amount} §bto §c${target.name}`);
  target.tell(`§bYou Have Recieved §a$${amount} §bfrom §c${player.name}`);
}

async function page6(player) {
  const money = metricNumbers(getScore(player, "money"));
  const time = metricNumbers(getScore(player, "hr"));
  const kills = metricNumbers(getScore(player, "Kills"));
  const deaths = metricNumbers(getScore(player, "Deaths"));
  const kdr = getScore(player, "KDR");
  const kdr_decimals = getScore(player, "KDR-Decimals");
  const allPlayers = world.getAllPlayers().map((plr) => plr.name);
  const response = await new ModalFormData()
    .title("§l§9Stats")
    .dropdown("Select a Player", allPlayers)
    .show(player);
  if (response.canceled) return;
  const target = world
    .getAllPlayers()
    .find((plr) => plr.name === allPlayers[response.formValues[0]]);
  if (!target) return player.tell("Player left the game!");
  const amount = parseInt(response.formValues[1]);
  player.runCommandAsync(
    `tellraw ${player.name} {"rawtext"[{"text"§b${target.name}s Stats\n--------------------------------------------------\n §fBalance §c- §b${money}\n §fTime Played §c- §b${time}\n §fKills §c- ${kills}\n §fDeaths §c- ${deaths}\n §fK/D §c- ${kdr}.${kdr_decimals}%"}]}`
  );
  target.tell(`§b${player.name} §eHas Checked Your Stats`);
}

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    if (!player.hasTag("in_combat"))
      player.runCommandAsync(
        'replaceitem entity ${player.name} slot.hotbar 8 minecraft:clock 1 0 {"minecraft:item_lock":{ "mode": "lock_in_slot" }, "minecraft:keep_on_death":{}}'
      );
    if (player.hasTag("in_combat"))
      player.runCommandAsync(
        'replaceitem entity ${player.name} slot.hotbar 8 minecraft:border_block 1 0 {"minecraft:item_lock":{ "mode": "lock_in_slot" }, "minecraft:keep_on_death":{}}'
      );
  });
}, 1);
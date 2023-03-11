import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

world.events.beforeItemUse.subscribe((data) => {
  let player = data.source;
  let item = data.item;

  if (item.typeId === "minecraft:clock") {
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
  form.button("§7Coming Soon");
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
  form.button("§6Next Page §8->");
  form.button("§4§lClose");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.addTag("Spawn");
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
    if (response.selection == 4) {
      page4(player);
    }
    if (response.selection == 5) {
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
      page3(player);
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
      player.addTag("Spawn");
    }
    if (response.selection == 1) {
      player.addTag("plots");
    }
    if (response.selection == 3) {
      page3(player);
    }
    if (response.selection == 4) {
      player.tell("§4§lClosed GUI");
    }
  });
}

world.events.tick.subscribe((data) => {
  if (!player.hasTag("in_combat"))
    player.runCommandAsync(
      'replaceitem entity slot.hotbar 8 minecraft:clock {"minecraft:item_lock":{ "mode": "lock_in_slot" }, "minecraft:keep_on_death":{}}'
    );
  if (!player.hasTag("in_combat"))
    player.runCommandAsync(
      'replaceitem entity slot.hotbar 8 minecraft:border_block {"minecraft:item_lock":{ "mode": "lock_in_slot" }, "minecraft:keep_on_death":{}}'
    );
});

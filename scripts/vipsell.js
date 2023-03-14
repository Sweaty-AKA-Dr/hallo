import { ItemStack, Items, system, world } from "@minecraft/server";

system.run(function tick() {
  for (const player of world.getPlayers()) {
    if (player.hasTag("vipsellgt")) {
      player.removeTag("vipsellgt");
      sell_items(player);
    }
  }
  system.run(tick);
});

function sell_items(player) {
  let sellable_items = {
    "minecraft:dirt": 2,
    "minecraft:sand": 4,
    "minecraft:log": 12,
    "minecraft:gravel": 10,
    "minecraft:cobblestone": 16,
    "minecraft:coal": 24,
    "minecraft:raw_copper": 8,
    "minecraft:raw_iron": 40,
    "minecraft:raw_gold": 50,
    "minecraft:redstone": 16,
    "minecraft:lapis_lazuli": 18,
    "minecraft:diamond": 150,
    "minecraft:quartz": 200,
    "minecraft:ancient_debris": 750,
    "minecraft:stained_glass": 2000,
  };

  const inventory = player.getComponent("inventory").container,
    { size } = inventory;
  const void_slot = new ItemStack(Items.get("minecraft:stick"), 0);
  let amount = 0;
  let item_count = 0;
  for (let i = 0; i < size; i++) {
    const item = inventory.getItem(i);
    if (!item) continue;
    const item_price = sellable_items[item.typeId];
    if (!item_price) continue;
    amount += item_price * item.amount;
    item_count += item.amount;
    inventory.setItem(i, void_slot);
  }

  if (item_count < 1) return;
  if (item_count >= 1) {
    player.runCommandAsync(`scoreboard players add @s money ${amount}`);
    player.sendMessage(`You sold x${item_count} item(s) for $${amount}.`);
  }
}

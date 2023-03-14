import { ItemStack, Items, system, world } from "@minecraft/server";

system.run(function tick() {
  for (const player of world.getPlayers()) {
    if (player.hasTag("sellgt")) {
      player.removeTag("sellgt");
      sell_items(player);
    }
  }
  system.run(tick);
});

function sell_items(player) {
  let sellable_items = {
    "minecraft:dirt": 1,
    "minecraft:sand": 2,
    "minecraft:log": 6,
    "minecraft:gravel": 5,
    "minecraft:cobblestone": 8,
    "minecraft:coal": 12,
    "minecraft:raw_copper": 4,
    "minecraft:raw_iron": 20,
    "minecraft:raw_gold": 25,
    "minecraft:redstone": 8,
    "minecraft:lapis_lazuli": 9,
    "minecraft:diamond": 75,
    "minecraft:quartz": 100,
    "minecraft:ancient_debris": 375,
    "minecraft:stained_glass": 1000,
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
    player.tell(`You sold x${item_count} item(s) for $${amount}.`);
  }
}

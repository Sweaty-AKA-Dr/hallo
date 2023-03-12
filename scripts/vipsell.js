import { Player, System, Container } from "@minecraft/server";

system.run(function t() {
  for (const p of world.getPlayers()) {
    if(!p.hasTag('vipsellgt')) return;
    sell(p)
  };
  system.run(t);
});

let sellItems = [
  {
    id: "minecraft:dirt",
    value: 2,
    data: 0,
  },
  {
    id: "minecraft:sand",
    value: 4,
    data: 0,
  },
  {
    id: "minecraft:log",
    value: 12,
    data: 0,
  },
  {
    id: "minecraft:gravel",
    value: 10,
    data: 0,
  },
  {
    id: "minecraft:cobblestone",
    value: 16,
    data: 0,
  },
  {
    id: "minecraft:coal",
    value: 24,
    data: 0,
  },
  {
    id: "minecraft:raw_copper",
    value: 8,
    data: 0,
  },
  {
    id: "minecraft:raw_iron",
    value: 40,
    data: 0,
  },
  {
    id: "minecraft:raw_gold",
    value: 50,
    data: 0,
  },
  {
    id: "minecraft:redstone",
    value: 16,
    data: 0,
  },
  {
    id: "minecraft:lapis_lazuli",
    value: 18,
    data: 0,
  },
  {
    id: "minecraft:diamond",
    value: 150,
    data: 0,
  },
  {
    id: "minecraft:quartz",
    value: 200,
    data: 0,
  },
  {
    id: "minecraft:ancient_debris",
    value: 750,
    data: 0,
  },
  {
    id: "minecraft:stained_glass",
    value: 2000,
    data: 4,
  },
];

const sell = (player) => {
  const inv = player.getComponent("inventory").container,
    { size } = inv;
  let amount = 0;
  for (let i = 0; i < size; i++) {
    const item = inv.getItem(i);
    if (!item) continue;
    const soldItem = sellItems.find((element) => {
      element.id === item.typeId && element.data === item.data;
    });
    if (!soldItem) continue;
    amount = amount + soldItem.value * item.amount;
    inv.setItem(i);
    player.runCommandAsync(`scoreboard players add @s Money ${amount}`);
    player.tell(`§eSold §d${item.amount} §efor §a$${amount}`);
    return amount;
  }
};
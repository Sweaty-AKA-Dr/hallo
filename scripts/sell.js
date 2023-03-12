import { Player, System, Container } from "@minecraft/server";

system.run(function t() {
  for (const p of world.getPlayers()) {
    if(!p.hasTag('sellgt')) return;
    sell(p)
  };
  system.run(t);
});

let sellItems = [
  {
    id: "minecraft:dirt",
    value: 1,
    data: 0,
  },
  {
    id: "minecraft:sand",
    value: 2,
    data: 0,
  },
  {
    id: "minecraft:log",
    value: 6,
    data: 0,
  },
  {
    id: "minecraft:gravel",
    value: 5,
    data: 0,
  },
  {
    id: "minecraft:cobblestone",
    value: 8,
    data: 0,
  },
  {
    id: "minecraft:coal",
    value: 12,
    data: 0,
  },
  {
    id: "minecraft:raw_copper",
    value: 4,
    data: 0,
  },
  {
    id: "minecraft:raw_iron",
    value: 20,
    data: 0,
  },
  {
    id: "minecraft:raw_gold",
    value: 25,
    data: 0,
  },
  {
    id: "minecraft:redstone",
    value: 8,
    data: 0,
  },
  {
    id: "minecraft:lapis_lazuli",
    value: 9,
    data: 0,
  },
  {
    id: "minecraft:diamond",
    value: 75,
    data: 0,
  },
  {
    id: "minecraft:quartz",
    value: 100,
    data: 0,
  },
  {
    id: "minecraft:ancient_debris",
    value: 375,
    data: 0,
  },
  {
    id: "minecraft:stained_glass",
    value: 1000,
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
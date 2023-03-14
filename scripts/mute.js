import { world } from "@minecraft/server";

world.events.beforeChat.subscribe((data) => {
let player = data.sender
  if (player.hasTag("muted")) data.cancel;
  player.sendMeaage("You Are Muted");
  return;
});

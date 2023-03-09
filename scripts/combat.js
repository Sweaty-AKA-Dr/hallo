import { world } from '@minecraft/server'
import { setTickTimeout } from './functions'import { world } from "@minecraft/server";
import { setTickTimeout } from "./functions";

world.events.entityHurt.subscribe((data) => {
  const attacker = data.damageSource.damagingEntity;
  const attacked = data.hurtEntity;
  if (attacker.typeId == "minecraft:player" && attacked.typeId == "minecraft:player") {
    attacker.addTag("in_combat");
    attacked.addTag("in_combat");
    setTickTimeout(() => {
      attacker.removeTag("in_combat");
      attacked.removeTag("in_combat");
    }, 200);
  } else if (attacker.typeId == "minecraft:player" && attacked.typeId == "minecraft:player" && attacked.getComponent("minecraft:health").current <= 0) {
    attacker.removeTag("in_combat");
    attacked.removeTag("incombat");
  } else return;
});

import { world } from "@minecraft/server";

export function setTickTimeout(callback, tick, loop = false) {
  let cT = 0;
  const tE = world.events.tick.subscribe((data) => {
    if (cT === 0) cT = data.currentTick + tick;
    if (cT <= data.currentTick) {
      try {
        callback();
      } catch (e) {
        console.warn(`${e} : ${e.stack}`);
      }
      if (loop) cT += tick;
      else world.events.tick.unsubscribe(tE);
    }
  });
}

export function getScore(target, value, useZero = true) {
  try {
    const objective = world.scoreboard.getObjective(value);
    if (typeof target == "string")
      return objective.getScore(
        objective
          .getParticipants()
          .find((player) => player.displayName == target)
      );
    return objective.getScore(target.scoreboard);
  } catch {
    return useZero ? 0 : NaN;
  }
}

export function metricNumbers(value) {
  const types = ["", "k", "M", "B"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(2) + types[selectType];
}

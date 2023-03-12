import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui"

Object.defineProperty(Player.prototype, "scores", {
    get() {
        const player = this
        return new Proxy({}, {
            get(_, property) {
                try {
                    return world.scoreboard.getObjective(property).getScore(player.scoreboard)
                } catch {
                    return NaN
                }
            },
            set(_, property, value) {
                player.runCommandAsync(`scoreboard players set @s "${property}" ${value}`)
            }
        })
    }
})

export function showMoneyTransferForm(player) {
    const allPlayers = world.getAllPlayers().map(plr => plr.name)
    const response = await new ModalFormData().title("Money Transfer").dropdown("Select a Player", allPlayers).textField(`Please insert the amount to transfer`, "Amount goes here...").show(player)
    if (response.canceled) return
    const target = world.getAllPlayers().find(plr => plr.name === allPlayers[response.formValues[0]])
    if (!target) return player.tell("Player left the game!")
    const amount = parseInt(response.formValues[1])
    if (isNaN(amount) || amount > player.scores["money"]) return player.tell("Invalid Amount!")
    player.scores["money"] -= amount
    target.scores["money"] += amount
    player.tell(`Sent $${amount} to ${target.name}`)
    target.tell(`Recieved $${amount} from ${player.name}`)
}

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

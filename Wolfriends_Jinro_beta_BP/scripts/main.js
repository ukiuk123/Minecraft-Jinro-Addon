import { world, system } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((event) => {
  const { sender, message } = event;
  if (sender.getTags().includes("death")) {
    event.cancel = true;
    if (message.startsWith("!tp ")) {
      const msg = message.split(" ")[1];
      const players = world.getPlayers();
      const targetPlayer = players.find(player => player.nameTag === msg);
      if (msg === "list") {
        sender.sendMessage(`§e- TPできるプレイヤー -`);
        players.forEach(player => {
          sender.sendMessage(`§7${player.nameTag}`);
        })
      } else if (msg === "@r") {
        system.run(() => {
          sender.runCommand(`tp @s @r[tag=sanka,tag=!death]`);
        });
      } else {
        system.run(() => {
          sender.runCommand(`tp @s ${targetPlayer.nameTag}`);
        });
      }
    } else {
      system.run(() => {
        sender.runCommand(`tellraw @a[tag=death] {"rawtext":[{"text":"§7[§b 霊界 §7] §r<${sender.nameTag}> ${message}"}]}`);
      });
    }
  }
});
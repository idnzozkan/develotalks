const colors = require("colors");

function printOnlineUserStats(users) {
  users.forEach((u) => {
    if (u.onlineAtRoom) {
      console.log(
        colors.green.bold(`${u.name}`),
        "online in a room with room ID",
        colors.bgGreen.black(`${u.onlineAtRoom.id}`)
      );
    } else {
      console.log(
        colors.red(`${colors.red.bold(`${u.name}`)} is not in a room`)
      );
    }
    console.log("---------------------");
  });
}

module.exports = printOnlineUserStats;
